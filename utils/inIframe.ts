/**
 * iframe 内か否か判定
 * @return window オブジェクトが存在し、iframe内であれば true、それ以外: false
 */
function inIframe() {
  return typeof window !== "undefined" && window.parent !== window;
}

export default inIframe;
