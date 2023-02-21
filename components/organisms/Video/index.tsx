import React, { useEffect } from "react";
import usePrevious from "@rooks/use-previous";
import clsx from "clsx";
import { css } from "@emotion/css";
import type { AccordionProps } from "@mui/material/Accordion";
import MuiAccordion from "@mui/material/Accordion";
import type { AccordionSummaryProps } from "@mui/material/AccordionSummary";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import type { AccordionDetailsProps } from "@mui/material/AccordionDetails";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";

import type { TopicSchema } from "$server/models/topic";
import type { VideoResourceSchema } from "$server/models/videoResource";
import VideoPlayer from "$organisms/Video/VideoPlayer";
import VideoResource from "$organisms/Video/VideoResource";
import { NEXT_PUBLIC_VIDEO_MAX_HEIGHT } from "$utils/env";
import { useVideoAtom } from "$store/video";
import { useBookAtom } from "$store/book";
import useOembed from "$utils/useOembed";
import type { SxProps } from "@mui/system";
import type { ActivitySchema } from "$server/models/activity";
import { isInstructor, isAdministrator } from "$utils/session";
import { useSessionAtom } from "$store/session";

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

const accordion = css({
  padding: 0,
  boxShadow: "none",
  "&:before": {
    display: "none",
  },
});

function Accordion(props: AccordionProps) {
  return <MuiAccordion {...props} className={accordion} />;
}

const accordionSummary = css({
  padding: 0,
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper": {
    margin: "4px",
  },
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
});

function AccordionSummary(props: AccordionSummaryProps) {
  return (
    <MuiAccordionSummary
      className={accordionSummary}
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
      {...props}
    />
  );
}

const accordionDetails = css({
  display: "flex",
  justifyContent: "center",
  padding: "0 8px 20px",
});

function AccordionDetails(props: AccordionDetailsProps) {
  return <MuiAccordionDetails {...props} className={accordionDetails} />;
}

type Props = {
  className?: string;
  sx?: SxProps;
  topic: TopicSchema;
  timeRange: ActivitySchema["timeRanges"];
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

const BAR_SIZE = 480;
function generateTimeRangeBarValue({
  timeRange,
  timeRequired,
}: {
  timeRange: ActivitySchema["timeRanges"];
  timeRequired: TopicSchema["timeRequired"];
}): Array<{ id: string; positionX: number; width: number }> {
  return timeRange.map((timeRange) => {
    const id = [timeRange?.activityId, timeRange?.startMs].join();
    const startMs = timeRange?.startMs || 0;
    const endMs = timeRange?.endMs || 0;
    const timeRadio = (endMs - startMs) / timeRequired / 1000;
    const width = BAR_SIZE * timeRadio;
    const lengthRatio = BAR_SIZE / timeRequired;
    const positionX = (lengthRatio * startMs) / 1000;

    return { id, positionX, width };
  });
}

export default function Video({
  className,
  sx,
  topic,
  timeRange,
  onEnded,
}: Props) {
  const { video, preloadVideo } = useVideoAtom();
  const { book, itemIndex, itemExists } = useBookAtom();
  const { session } = useSessionAtom();
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
        {session && !isInstructor(session) && !isAdministrator(session) && (
          <Accordion>
            <AccordionSummary>視聴時間詳細</AccordionSummary>
            <AccordionDetails>
              <svg
                height={20}
                width={BAR_SIZE}
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x={0}
                  y={0}
                  height={20}
                  width={BAR_SIZE}
                  stroke="black"
                  fill="transparent"
                />
                {generateTimeRangeBarValue({
                  timeRange,
                  timeRequired: topic.timeRequired,
                }).map((value) => {
                  return (
                    <React.Fragment key={value.id}>
                      <rect
                        x={value.positionX}
                        width={value.width}
                        height={20}
                        fill="black"
                      />
                    </React.Fragment>
                  );
                })}
              </svg>
            </AccordionDetails>
          </Accordion>
        )}
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
