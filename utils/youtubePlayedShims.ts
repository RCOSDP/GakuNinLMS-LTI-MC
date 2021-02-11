import type { VideoJsPlayer } from "video.js";
import { IntervalTree } from "node-interval-tree";

const youtubeType = "video/youtube";

/**
 * 無効な速度で再生しているか否か
 * timeupdate イベント発火頻度は通常 4-66Hz 程度
 * playbackRate が 1.0 のとき currentTime の差分が 500 ms を超えているならば無効と判定
 * https://html.spec.whatwg.org/multipage/media.html#playing-the-media-resource
 * @param player VideoJsPlayer
 * @param diff timeupdate 発火時の currentTime の差分 (秒)
 * @return 無効な速度で再生しているならば true、それ以外ならば false
 */
function invalidSpeed(player: VideoJsPlayer, diff: number) {
  return Math.abs(diff) > 0.5 * player.playbackRate();
}

/** HTMLMediaElement.played に相当するAPIの再現 */
function youtubePlayedShims(player: VideoJsPlayer) {
  if (player.currentType() !== youtubeType) return;

  const tree = new IntervalTree();

  function played() {
    const timeRanges = [...tree.inOrder()];
    return {
      length: timeRanges.length,
      start: (i: number) => timeRanges[i].low,
      end: (i: number) => timeRanges[i].high,
    };
  }

  let start = player.currentTime();
  let prev = start;
  player.on("timeupdate", () => {
    const end = player.currentTime();
    const diff = end - prev;
    prev = end;

    if (end <= start || player.seeking() || invalidSpeed(player, diff)) {
      start = end;
      return;
    }

    tree.search(start, end).forEach((range) => tree.remove(range));
    tree.insert({ low: start, high: end });
  });

  Object.assign(player, { played });
}

export default youtubePlayedShims;
