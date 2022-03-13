import { useEffect } from "react";
import usePrevious from "@rooks/use-previous";
import clsx from "clsx";
import { css } from "@emotion/css";
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
  resource: VideoResourceSchema;
  startTime: number | null;
  stopTime: number | null;
  onEnded?: () => void;
};

export default function Video({
  className,
  sx,
  resource,
  startTime,
  stopTime,
  onEnded,
}: Props) {
  const { video, updateVideo } = useVideoAtom();
  const { book, itemIndex, itemExists } = useBookAtom();
  const prevItemIndex = usePrevious(itemIndex);
  useEffect(() => {
    if (!book) return;
    updateVideo(book.sections);
    return () => video.clear();
  }, [book, video, updateVideo]);
  useEffect(() => {
    if (prevItemIndex?.some((v, i) => v !== itemIndex[i])) {
      video.get(itemExists(prevItemIndex)?.resource.url ?? "")?.player.pause();
    }
    const videoInstance = video.get(itemExists(itemIndex)?.resource.url ?? "");
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
        videoInstance.player.off("timeupdate", handleTimeUpdate);
        videoInstance.player.off("seeked", handleSeeked);
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
        // eslint-disable-next-line tsc/config
        if (Number.isFinite(stopTime) && currentTime > stopTime) {
          handleEnded();
        }
      };
      videoInstance.player.on("ended", () => handleEnded());
      videoInstance.player.on("firstplay", () =>
        videoInstance.player.currentTime(startTime || 0)
      );
      videoInstance.player.ready(() => {
        const currentTime = videoInstance.player.currentTime();
        // eslint-disable-next-line tsc/config
        if (Number.isFinite(stopTime) && currentTime > stopTime) {
          videoInstance.player.currentTime(startTime || 0);
        }
        videoInstance.player.on("timeupdate", handleTimeUpdate);
        videoInstance.player.on("seeked", handleSeeked);
        void videoInstance.player.play();
      });
    }
  }, [
    video,
    itemExists,
    prevItemIndex,
    itemIndex,
    startTime,
    stopTime,
    onEnded,
  ]);
  return (
    <>
      {Array.from(video.values()).map((videoInstance) => (
        <VideoPlayer
          key={videoInstance.url}
          className={clsx(className, {
            [hidden]: resource.url != videoInstance.url,
          })}
          sx={{ ...videoStyle, ...sx }}
          videoInstance={videoInstance}
        />
      ))}
      {video.size === 0 && (
        <VideoResource
          className={className}
          sx={{ ...videoStyle, ...sx }}
          {...resource}
          autoplay
        />
      )}
    </>
  );
}
