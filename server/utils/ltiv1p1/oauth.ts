import { createHmac, timingSafeEqual } from "crypto";
import strictUriEncode from "strict-uri-encode";

/**
 * OAuth 1.0 プロトコルにおける署名の作成。ただし、POST メソッド固定。HMAC-SHA1 固定。
 * @param url スキーマ・ホスト名・パスを含む URL。スキームのデフォルトポートでない場合、ポート番号を含む。
 * @param param パラメーター。LTI v1.1 ではPOSTリクエストボディを解釈したもの。`oauth_signature` を含まない。
 * @param oauthConsumerSecret OAuth Consumer Secret
 */
export function sign(
  url: string,
  params: Record<string, string>,
  oauthConsumerSecret: string
) {
  const method = "POST";
  const orderedParams = Object.entries({
    ...params,
    oauth_signature_method: "HMAC-SHA1",
  })
    .sort()
    .map((es) => es.map(encodeURIComponent).join("="))
    .join("&");
  const signatureBase = [method, url, orderedParams]
    .map(strictUriEncode)
    .join("&");
  const oauthTokenSecret = "";
  const signatureKey = [oauthConsumerSecret, oauthTokenSecret]
    .map(strictUriEncode)
    .join("&");
  const signature = createHmac("sha1", signatureKey)
    .update(signatureBase)
    .digest("base64");
  return signature;
}

/**
 * パラメーターが不足ない
 * @param reqBody クライアントからのリクエストパラメーター。LTI v1.1 ではPOSTリクエストボディを解釈したもの。
 */
export function valid(reqBody: Record<string, unknown>) {
  const oauthParams = [
    "oauth_version",
    "oauth_nonce",
    "oauth_timestamp",
    "oauth_consumer_key",
    "oauth_signature_method",
    "oauth_signature",
  ];
  const ltiLaunchParams = [
    "lti_message_type",
    "lti_version",
    "resource_link_id",
  ];
  return (
    reqBody.oauth_version === "1.0" &&
    reqBody.lti_message_type === "basic-lti-launch-request" &&
    reqBody.lti_version === "LTI-1p0" &&
    [...oauthParams, ...ltiLaunchParams].every(
      (k) => typeof reqBody[k] === "string"
    )
  );
}

/**
 * 認可
 * @param url スキーマ・ホスト名・パスを含む URL。スキームのデフォルトポートでない場合、ポート番号を含む。
 * @param reqBody クライアントからのリクエストパラメーター。LTI v1.1 ではPOSTリクエストボディを解釈したもの。
 * @param oauthConsumerKey OAuth Consumer Key
 * @param oauthConsumerSecret OAuth Consumer Secret
 */
export async function auth(
  url: string,
  reqBody: Record<string, string>,
  oauthConsumerKey: string,
  oauthConsumerSecret: string,
  lookupNonce: (nonce: string, timestamp: number) => Promise<boolean>
) {
  const { oauth_signature, ...params } = reqBody;
  const noncePresence = await lookupNonce(
    params.oauth_nonce,
    Number(params.oauth_timestamp)
  );
  return (
    !noncePresence &&
    params.oauth_consumer_key === oauthConsumerKey &&
    params.oauth_signature_method === "HMAC-SHA1" &&
    safeEq(oauth_signature, sign(url, params, oauthConsumerSecret))
  );
}

/**
 * タイミングセーフな文字列等価性
 */
function safeEq(a: string, b: string) {
  return (
    a.length === b.length && timingSafeEqual(Buffer.from(a), Buffer.from(b))
  );
}
