/**
 * 動画プレイヤーインスタンス生成時に生成するHTML要素を
 * 格納するHTML要素の生成
 * See https://github.com/npocccties/chibichilo/issues/497#issuecomment-907995610
 * @returns DOMに含まれるが非表示なHTML要素
 */
function getVideoHolder() {
  const videoHolder = document.getElementById("video-holder");
  if (videoHolder) return videoHolder;
  const element = document.createElement("div");
  element.id = "video-holder";
  element.style.display = "none";
  document.body.appendChild(element);
  return element;
}

export default getVideoHolder;
