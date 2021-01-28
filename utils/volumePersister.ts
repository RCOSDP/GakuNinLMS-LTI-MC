import { VideoJsPlayer } from "video.js";
import VimeoPlayer from "@vimeo/player";

type Volume = {
  /** 音量 0-1 */
  volume: number;
  /** ミュート */
  muted: boolean;
};

const key = "volumePersisterVolume";
const muteKey = "volumePersisterMute";
const mutedState = "true";

function save({ volume, muted }: Volume) {
  localStorage.setItem(key, volume.toString());
  if (muted) localStorage.setItem(muteKey, mutedState);
  else localStorage.removeItem(muteKey);
}

function load(): Volume | undefined {
  const volume = localStorage.getItem(key);
  if (volume == null) return;
  const muted = localStorage.getItem(muteKey) === mutedState;
  return {
    volume: Number(volume),
    muted,
  };
}

async function intoVimeo(player: VimeoPlayer) {
  player.on("volumechange", async function (event: { volume: number }) {
    const muted = await player.getMuted();
    save({ volume: event.volume, muted });
  });

  const volume = load();
  if (volume == null) return;
  await Promise.all([
    player.setVolume(volume.volume),
    player.setMuted(volume.muted),
  ]);
}

function intoVideoJs(player: VideoJsPlayer) {
  player.on("volumechange", function () {
    const volume = player.volume();
    const muted = player.muted();
    save({ volume, muted });
  });

  const volume = load();
  if (volume == null) return;
  player.volume(volume.volume);
  player.muted(volume.muted);
}

async function volumePersister(player: VideoJsPlayer | VimeoPlayer) {
  if (typeof window === "undefined") return;
  if (player instanceof VimeoPlayer) {
    await intoVimeo(player);
  } else {
    intoVideoJs(player);
  }
}

export default volumePersister;
