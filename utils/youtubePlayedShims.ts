import type { VideoJsPlayer } from "video.js";
import { IntervalTree } from "node-interval-tree";

const youtubeType = "video/youtube";

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
  player.on("timeupdate", () => {
    const end = player.currentTime();
    if (end < start) start = end;
    tree.search(start, end).forEach((range) => tree.remove(range));
    tree.insert({ low: start, high: end });
  });

  Object.assign(player, { played });
}

export default youtubePlayedShims;
