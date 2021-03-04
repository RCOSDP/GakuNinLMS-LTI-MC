import { createHash } from "crypto";

/**
 * Wowza Streaming Engine のクライアントのための署名の作成
 * パラメータ名にアルファベットA-Za-z以外を含めると正しい署名の得られない可能性があるので注意
 * @todo "Include client IP address in hash generation" 未対応
 * @param contentPath コンテンツのパス
 * @param params パラメーター
 * @param prefix SecureToken prefix
 * @param secret 共通鍵
 * @param algorithm アルゴリズム
 */
export function sign(
  contentPath: string,
  params: Record<string, string>,
  prefix: string,
  secret: string,
  algorithm: "sha256" | "sha384" | "sha512"
) {
  const orderedParams = Object.entries(params)
    .map(([key, value]) => `${prefix}${key}=${value}`)
    .concat(secret)
    .sort()
    .join("&");
  const signatureBase = [contentPath, orderedParams].join("?");
  const signature = createHash(algorithm)
    .update(signatureBase)
    .digest("base64")
    .replace(
      /[+/]/g,
      (t) =>
        ({
          "+": "-",
          "/": "_",
        }[t as "+" | "/"])
    );
  return signature;
}

/**
 * Wowza Streaming Engine のクライアントのためのURLクエリの生成
 * パラメータ名にアルファベットA-Za-z以外を含めると正しい署名の得られない可能性があるので注意
 * @todo "Include client IP address in hash generation" 未対応
 * @param contentPath コンテンツのパス
 * @param params パラメーター
 * @param secret 共通鍵
 * @param prefix SecureToken prefix
 * @param algorithm アルゴリズム
 */
export function query(
  contentPath: string,
  params: Record<string, string>,
  prefix: string,
  secret: string,
  algorithm: "sha256" | "sha384" | "sha512"
) {
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries({
    ...params,
    hash: sign(contentPath, params, prefix, secret, algorithm),
  })) {
    query.set(`${prefix}${key}`, value);
  }

  return query;
}
