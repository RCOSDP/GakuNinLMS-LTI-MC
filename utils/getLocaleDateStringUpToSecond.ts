/**
 * ローカライズした日時分秒の生成
 * @param date Date オブジェクト
 * @param locales 言語 BCP 47
 */

function getLocaleDateStringUpToSecond(
  date: Date,
  locales: string | string[]
): string {
  return date.toLocaleDateString(locales, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
}

export default getLocaleDateStringUpToSecond;
