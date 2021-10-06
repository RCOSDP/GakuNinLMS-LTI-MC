/**
 * px単位付きの文字列から数値を抽出する
 * @param "[0-9]+px"の文字列
 * @returns 単位を取り除いた数値
 */
function extractNumberFromPx(valueWithPx: string): number {
  return Number(valueWithPx.replace(/px$/, ""));
}

export default extractNumberFromPx;
