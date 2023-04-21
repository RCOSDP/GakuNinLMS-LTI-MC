/**
 * ローカライズした日付の生成
 * @param date Date オブジェクト
 * @param locales 言語 BCP 47
 */

function getLocaleDateString(
  date: Date,
  locales: string | string[] = window.navigator.language
): string {
  return date.toLocaleDateString(locales, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default getLocaleDateString;
