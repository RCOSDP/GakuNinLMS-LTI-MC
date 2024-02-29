import type { VideoJsPlayer } from "$types/videoJsPlayer";

/**
 * Vimeo相当のdurationchangeでのdurationの取得の再現
 * @param player Video.jsプレイヤーのインスタンス
 * @param handler イベントハンドラー
 */
function videoJsDurationChangeShims(
  player: VideoJsPlayer,
  handler: ({ duration }: { duration: number }) => void
) {
  // NOTE: YouTubeの場合、playイベント発火より前だと`player.duration()`に失敗
  const handlePlay = () => {
    player.off("play", handlePlay);
    // NOTE: wowza(hlsjs)の場合、play直後は再生時間が取れないため、ほんの少し待機する
    const intervalID = setInterval(() => {
      const duration = player.duration();
      if (duration) {
        handler({ duration });
        clearInterval(intervalID);
      }
    });
    setTimeout(() => {
      clearInterval(intervalID);
    }, 2000);
  };
  player.on("play", handlePlay);
}

export default videoJsDurationChangeShims;
