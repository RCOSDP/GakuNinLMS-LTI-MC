import { useEffect } from "react";
import usePrevious from "@rooks/use-previous";
import clsx from "clsx";
import { css } from "@emotion/css";
import type { TopicSchema } from "$server/models/topic";
import type { VideoResourceSchema } from "$server/models/videoResource";
import VideoPlayer from "$organisms/Video/VideoPlayer";
import VideoResource from "$organisms/Video/VideoResource";
import { NEXT_PUBLIC_VIDEO_MAX_HEIGHT } from "$utils/env";
import { useVideoAtom } from "$store/video";
import { useBookAtom } from "$store/book";
import useOembed from "$utils/useOembed";
import type { SxProps } from "@mui/system";

const hidden = css({
  m: 0,
  width: 0,
  "& *": {
    visibility: "hidden",
  },
});

const videoStyle = {
  "& > *": {
    /* NOTE: 各動画プレイヤーのレスポンシブ対応により、高さはpaddingTopによってwidthのpercentage分
     * 確保されるため、heightによる制限ではなくwidthによる制限をおこなう必要がある */
    // NOTE: 16:9前提になっているが本当はアスペクト比に応じて最大高さを変えたい
    maxWidth:
      NEXT_PUBLIC_VIDEO_MAX_HEIGHT === "unset"
        ? "unset"
        : `calc(${NEXT_PUBLIC_VIDEO_MAX_HEIGHT} * 16 / 9)`,
    margin: "0 auto",
  },
} as const;

type Props = {
  className?: string;
  sx?: SxProps;
  topic: TopicSchema;
  onEnded?: () => void;
};

/**
 * 再生終了時間が有効か否か
 * @return 有効かつ再生終了: true、それ以外: false
 */
function isValidPlaybackEnd({
  currentTime,
  stopTime,
}: {
  currentTime: number;
  stopTime: number | null | undefined;
}): boolean {
  return typeof stopTime === "number" && 0 < stopTime && stopTime < currentTime;
}

export default function Video({ className, sx, topic, onEnded }: Props) {
  const { video, preloadVideo } = useVideoAtom();
  const { book, itemIndex, itemExists } = useBookAtom();
  useEffect(() => {
    if (!book) return;
    // バックグラウンドで動画プレイヤーオブジェクトプールに読み込む
    preloadVideo(book.sections);
    return () => video.clear();
  }, [book, preloadVideo, video]);
  const oembed = useOembed(topic.resource.id);
  const prevItemIndex = usePrevious(itemIndex);
  useEffect(() => {
    const topic = itemExists(itemIndex);
    const startTime = topic?.startTime;
    const stopTime = topic?.stopTime;
    if (prevItemIndex?.some((v, i) => v !== itemIndex[i])) {
      void video.get(String(itemExists(prevItemIndex)?.id))?.player.pause();
    }
    const videoInstance = video.get(String(topic?.id));
    if (!videoInstance) return;
    if (videoInstance.type === "vimeo") {
      videoInstance.player.on("timeupdate", async () => {
        const currentTime = await videoInstance.player.getCurrentTime();
        if (isValidPlaybackEnd({ currentTime, stopTime })) {
          void videoInstance.player.pause();
          onEnded?.();
        }
        // @ts-expect-error startTime is number
        if (Number.isFinite(startTime) && currentTime < startTime) {
          void videoInstance.player.setCurrentTime(startTime || 0);
        }
      });
      void videoInstance.player.setCurrentTime(startTime || 0);
    } else {
      const handleSeeked = () => {
        const currentTime = videoInstance.player.currentTime();
        // @ts-expect-error startTime is number
        if (Number.isFinite(startTime) && currentTime < startTime) {
          videoInstance.player.currentTime(startTime || 0);
        }
      };
      const handleTimeUpdate = () => {
        if (videoInstance.stopTimeOver) return;
        const currentTime = videoInstance.player.currentTime();
        if (isValidPlaybackEnd({ currentTime, stopTime })) {
          videoInstance.stopTimeOver = true;
          videoInstance.player.pause();
          onEnded?.();
        }
      };
      const handlePlay = () => {
        // 終了位置より後ろにシークすると、意図せず再生が再開してしまうことがあるので、ユーザーの操作によらない再生開始を抑制する
        if (videoInstance.stopTimeOver) videoInstance.player.pause();
      };
      const handleFirstPlay = () => {
        if (Number.isFinite(startTime))
          videoInstance.player.currentTime(startTime || 0);
      };
      const handleReady = () => {
        if (videoInstance.stopTimeOver) {
          if (Number.isFinite(startTime))
            videoInstance.player.currentTime(startTime || 0);
          videoInstance.stopTimeOver = false;
        }
        videoInstance.player.on("timeupdate", handleTimeUpdate);
        videoInstance.player.on("seeked", handleSeeked);
      };

      videoInstance.player.on("play", handlePlay);
      videoInstance.player.on("firstplay", handleFirstPlay);
      videoInstance.player.ready(handleReady);
    }
    // TODO: videoの内容の変更検知は機能しないので修正したい。Mapオブジェクトでの管理をやめるかMap.prototype.set()を使用しないようにするなど必要かもしれない。
  }, [video, itemExists, prevItemIndex, itemIndex, onEnded]);

  // 動画プレイヤーオブジェクトプールに存在する場合
  if (video.has(String(topic.id))) {
    return (
      <>
        {Array.from(video.entries()).map(([id, videoInstance]) => (
          <VideoPlayer
            key={id}
            className={clsx(className, {
              [hidden]: String(topic.id) !== id,
            })}
            sx={{ ...videoStyle, ...sx }}
            videoInstance={videoInstance}
            autoplay={String(topic.id) === id}
            onEnded={String(topic.id) === id ? onEnded : undefined}
          />
        ))}
      </>
    );
  }

  return (
    <VideoResource
      className={className}
      sx={{ ...videoStyle, ...sx }}
      {...(topic.resource as VideoResourceSchema)}
      identifier={String(topic.id)}
      autoplay
      onEnded={onEnded}
      thumbnailUrl={oembed && oembed.thumbnail_url}
    />
  );
}
