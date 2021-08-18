import formatDuration from "date-fns/formatDuration";
import intervalToDuration from "date-fns/intervalToDuration";
import ja from "date-fns/locale/ja";

/**
 * 相対時間を日本語表記で表示する
 * @param start 開始日時
 * @param end 終了日時
 * @returns 日本語表記の相対時間
 */
function formatInterval(start: Date | number, end: Date | number) {
  const duration = intervalToDuration({ start, end });
  return formatDuration(duration, { locale: ja });
}

export default formatInterval;
