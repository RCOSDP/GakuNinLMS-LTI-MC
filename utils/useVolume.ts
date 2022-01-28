import { useCallback, useEffect } from "react";
import useSWRImmutable from "swr/immutable";
import { useDebouncedCallback } from "use-debounce";
import type { VideoJsPlayer } from "video.js";
import VimeoPlayer from "@vimeo/player";

type Player = VideoJsPlayer | VimeoPlayer;

type Volume = {
  /** 音量 0-1 */
  volume: number;
  /** ミュート */
  muted: boolean;
};

/** イベント発火の間隔を間引くための遅延時間 (ms) */
const wait = 100;
/** VideoJsPlayer.readyState() 監視間隔 (ms) */
const interval = 1_000;
/** Storage に永続化するための識別子 */
const key = "volumePersisterVolume";
/** Storage に永続化するための識別子 */
const muteKey = "volumePersisterMute";
/** ミュート状態を意味する文字列 */
const mutedState = "true";
/** デフォルト値 */
const defaultValues: Volume = { volume: 1, muted: false };

/** Storage への保存処理 */
function save({ volume, muted }: Volume) {
  localStorage.setItem(key, volume.toString());
  if (muted) localStorage.setItem(muteKey, mutedState);
  else localStorage.removeItem(muteKey);
}

/** Storage からの読み込み処理 */
function load(): Volume {
  const volume = localStorage.getItem(key);
  if (volume == null) return defaultValues;
  const muted = localStorage.getItem(muteKey) === mutedState;
  return { volume: Number(volume), muted };
}

/** 動画プレイヤーへの音量の設定処理 */
function setVolume(player: Player, data: Volume): void {
  if (player instanceof VimeoPlayer) {
    void player.setVolume(data.volume);
    void player.setMuted(data.muted);
  } else {
    player.volume(data.volume);
    player.muted(data.muted);
  }
}

/** 動画プレイヤーからの音量の取得処理 */
async function getVolume(player: Player): Promise<Volume> {
  const [volume, muted] = await Promise.all([
    player instanceof VimeoPlayer ? player.getVolume() : player.volume(),
    player instanceof VimeoPlayer ? player.getMuted() : player.muted(),
  ]);
  return { volume, muted };
}

/** 音量の設定の保存と反映のためのカスタムフック */
function useVolume(player: Player) {
  const { data: ready } = useSWRImmutable<boolean>(
    [key, player],
    () =>
      ready ||
      player instanceof VimeoPlayer ||
      // NOTE: videojs-youtube はバッファリングが行われるまで誤った値が得られうるため待機
      player.readyState() === 4 /* HaveEnoughData */,
    { refreshInterval: interval }
  );
  const { data, mutate } = useSWRImmutable<Volume>(key, load);
  const update = useCallback(async () => {
    save(await getVolume(player));
    await mutate();
  }, [player, mutate]);
  const onChange = useDebouncedCallback(update, wait);
  useEffect(() => {
    if (data) setVolume(player, data);
  }, [player, data]);
  useEffect(() => {
    if (ready) player.on("volumechange", onChange);
    return () => player.off("volumechange", onChange);
  }, [player, ready, onChange]);
}

export default useVolume;
