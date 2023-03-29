import { useCallback, useEffect } from "react";
import useSWRImmutable from "swr/immutable";
import type { VideoJsPlayer } from "$types/videoJsPlayer";
import VimeoPlayer from "@vimeo/player";

type Player = VideoJsPlayer | VimeoPlayer;

/** 再生速度 */
type PlaybackRate = number;

/** VideoJsPlayer.readyState() 監視間隔 (ms) */
const interval = 1_000;
/** Storage に永続化するための識別子 */
const key = "playbackRatePersister";
/** デフォルト値 */
const defaultValues: PlaybackRate = 1;

/** Storage への再生速度の保存処理 */
function save(data: PlaybackRate) {
  localStorage.setItem(key, data.toString());
}

/** Storage からの再生速度の読み込み処理 */
export function load(): PlaybackRate {
  const data = localStorage.getItem(key);
  if (data == null) return defaultValues;
  return Number(data);
}

/** 動画プレイヤーへの再生速度の設定処理 */
function setPlaybackRate(player: Player, data: PlaybackRate): void {
  if (player instanceof VimeoPlayer) {
    void player.setPlaybackRate(data);
  } else {
    player.playbackRate(data);
  }
}

/** 動画プレイヤーからの再生速度の取得処理 */
async function getPlaybackRate(player: Player): Promise<PlaybackRate> {
  const data = await (player instanceof VimeoPlayer
    ? player.getPlaybackRate()
    : player.playbackRate());
  return data;
}

/** 再生速度の設定の保存と反映のためのカスタムフック */
export function usePlaybackRate(player: Player) {
  const { data: ready } = useSWRImmutable(
    { key, player },
    (): boolean =>
      ready ||
      player instanceof VimeoPlayer ||
      // NOTE: videojs-youtube はバッファリングが行われるまで誤った値が得られうるため待機
      player.readyState() === 4 /* HaveEnoughData */,
    { refreshInterval: interval }
  );
  const { data, mutate } = useSWRImmutable<PlaybackRate>(key, load);
  const onChange = useCallback(async () => {
    save(await getPlaybackRate(player));
    await mutate();
  }, [player, mutate]);
  useEffect(() => {
    if (data) setPlaybackRate(player, data);
  }, [player, data]);
  useEffect(() => {
    if (ready) player.on("ratechange", onChange);
    return () => player.off("ratechange", onChange);
  }, [player, ready, onChange]);
}
