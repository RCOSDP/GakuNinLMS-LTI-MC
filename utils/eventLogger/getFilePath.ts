import getValidUrl from "$utils/getValidUrl";

/**
 * ビデオリソースURLをv1イベントオブジェクトのfileパラメーターに変換
 * @param e.providerUrl 動画プロバイダーの識別子
 * @param e.url URL
 * @return v1イベントオブジェクトのfileパラメーター
 */
function getFilePath({
  providerUrl,
  url,
}: {
  providerUrl: string | null;
  url: string;
}) {
  const validUrl = getValidUrl(url);
  // TODO: URLの取得に失敗し "" が得られる不具合が解決すればこの処理はおそらく不要
  if (!validUrl) return;

  if (providerUrl === "https://www.youtube.com/") {
    return new URLSearchParams(url.split("?")[1]).get("v") ?? undefined;
  }

  return validUrl.pathname.replace(/^\/(?:api\/v2\/wowza\/)?/, "");
}

export default getFilePath;
