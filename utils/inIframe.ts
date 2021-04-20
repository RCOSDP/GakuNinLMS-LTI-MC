/**
 * iframe 内で埋め込み表示されていることを判定
 * @return window オブジェクトが存在し、トップフレームで無い場合: true, それ以外: false
 */
function inIframe() {
  return typeof window !== "undefined" && window !== window.top;
}

export default inIframe;
