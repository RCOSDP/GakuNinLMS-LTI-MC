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

export default function Video({ className, sx, topic, onEnded }: Props) {
  const { video, updateVideo } = useVideoAtom();
  const { book, itemIndex, itemExists } = useBookAtom();
  const prevItemIndex = usePrevious(itemIndex);
  useEffect(() => {
    if (!book) return;
    updateVideo(book.sections);
    return () => video.clear();
  }, [book, video, updateVideo]);
  useEffect(() => {
    const topic = itemExists(itemIndex);
    const startTime = topic?.startTime;
    const stopTime = topic?.stopTime;
    if (prevItemIndex?.some((v, i) => v !== itemIndex[i])) {
      video.get(String(itemExists(prevItemIndex)?.id))?.player.pause();
    }
    const videoInstance = video.get(String(topic?.id));
    if (!videoInstance) return;
    if (videoInstance.type == "vimeo") {
      videoInstance.player.on("ended", () => onEnded?.());
      videoInstance.player.on("timeupdate", async () => {
        const currentTime = await videoInstance.player.getCurrentTime();
        // eslint-disable-next-line tsc/config
        if (Number.isFinite(stopTime) && currentTime > stopTime) {
          void videoInstance.player.pause();
          onEnded?.();
        }
        // eslint-disable-next-line tsc/config
        if (Number.isFinite(startTime) && currentTime < startTime) {
          void videoInstance.player.setCurrentTime(startTime || 0);
        }
      });
      void videoInstance.player.setCurrentTime(startTime || 0);
      videoInstance.player.play().catch(() => {
        // nop
      });
    } else {
      const handleEnded = () => {
        videoInstance.stopTimeOver = true;
        videoInstance.player.pause();
        onEnded?.();
      };
      const handleSeeked = () => {
        const currentTime = videoInstance.player.currentTime();
        // eslint-disable-next-line tsc/config
        if (Number.isFinite(startTime) && currentTime < startTime) {
          videoInstance.player.currentTime(startTime || 0);
        }
      };
      const handleTimeUpdate = () => {
        const currentTime = videoInstance.player.currentTime();
        if (
          !videoInstance.stopTimeOver &&
          Number.isFinite(stopTime) &&
          // eslint-disable-next-line tsc/config
          currentTime > stopTime
        ) {
          handleEnded();
        }
      };
      const handlePlay = () => {
        // 終了位置より後ろにシークすると、意図せず再生が再開してしまうことがあるので、ユーザーの操作によらない再生開始を抑制する
        if (videoInstance.stopTimeOver) videoInstance.player.pause();
      };
      const handleFirstPlay = () => {
        videoInstance.player.currentTime(startTime || 0);
      };
      const handleReady = () => {
        if (videoInstance.stopTimeOver) {
          videoInstance.player.currentTime(startTime || 0);
          videoInstance.stopTimeOver = false;
        }
        videoInstance.player.on("timeupdate", handleTimeUpdate);
        videoInstance.player.on("seeked", handleSeeked);
        videoInstance.player.play()?.catch(() => {
          // nop
        });
      };

      videoInstance.player.on("ended", handleEnded);
      videoInstance.player.on("play", handlePlay);
      videoInstance.player.on("firstplay", handleFirstPlay);
      videoInstance.player.ready(handleReady);
    }
  }, [video, itemExists, prevItemIndex, itemIndex, onEnded]);
  return (
    <>
      {Array.from(video.entries()).map(([topicId, videoInstance]) => (
        <VideoPlayer
          key={topicId}
          className={clsx(className, {
            [hidden]: String(topic.id) !== topicId,
          })}
          sx={{ ...videoStyle, ...sx }}
          videoInstance={videoInstance}
        />
      ))}
      {video.size === 0 && (
        <VideoResource
          className={className}
          sx={{ ...videoStyle, ...sx }}
          {...(topic.resource as VideoResourceSchema)}
          autoplay
        />
      )}
    </>
  );
}
