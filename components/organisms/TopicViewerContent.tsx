import clsx from "clsx";
import type { TopicSchema } from "$server/models/topic";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Video from "$organisms/Video";
import VideoPlayer from "$organisms/Video/VideoPlayer";
import DescriptionList from "$atoms/DescriptionList";
import License from "$atoms/License";
import Markdown from "$atoms/Markdown";
import useSticky from "$utils/useSticky";
import getLocaleDateString from "$utils/getLocaleDateString";
import { authors } from "$utils/descriptionList";
import formatInterval from "$utils/formatInterval";
import { NEXT_PUBLIC_VIDEO_MAX_HEIGHT } from "$utils/env";
import { isVideoResource } from "$utils/videoResource";
import { useVideoAtom } from "$store/video";
import { gray } from "$theme/colors";
import { css } from "@emotion/css";

const hidden = css({
  m: 0,
  width: 0,
  "& *": {
    visibility: "hidden",
  },
});

const videoStyle = {
  mt: -2,
  mx: -3,
  mb: 2,
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
  topic: TopicSchema;
  onEnded?: () => void;
  offset?: string;
};

export default function TopicViewerContent({ topic, onEnded, offset }: Props) {
  const theme = useTheme();
  const sticky = useSticky({
    offset: offset ?? theme.spacing(-2),
    backgroundColor: gray[800],
  });
  const { video } = useVideoAtom();
  return (
    <>
      {Array.from(video.values()).map((videoInstance) => (
        <VideoPlayer
          key={videoInstance.url}
          className={clsx(sticky, {
            [hidden]: topic.resource.url != videoInstance.url,
          })}
          sx={videoStyle}
          videoInstance={videoInstance}
          onEnded={onEnded}
        />
      ))}
      {video.size === 0 && isVideoResource(topic.resource) && (
        <Video
          className={sticky}
          sx={videoStyle}
          {...topic.resource}
          onEnded={onEnded}
          autoplay
        />
      )}
      <header>
        <Typography
          sx={{
            display: "inline-block",
            verticalAlign: "middle",
            mr: 1,
            mb: 0.5,
          }}
          variant="h6"
        >
          {topic.name}
        </Typography>
        <Chip
          sx={{ mr: 1, mb: 0.5 }}
          label={`学習時間 ${formatInterval(0, topic.timeRequired * 1000)}`}
        />
        {topic.license && (
          <License sx={{ mr: 1, mb: 0.5 }} license={topic.license} />
        )}
      </header>
      <DescriptionList
        inline
        value={[
          {
            key: "作成日",
            value: getLocaleDateString(topic.createdAt, "ja"),
          },
          {
            key: "更新日",
            value: getLocaleDateString(topic.updatedAt, "ja"),
          },
          ...authors(topic),
        ]}
      />
      <Box component="article" sx={{ my: -1.5 }}>
        <Markdown>{topic.description}</Markdown>
      </Box>
    </>
  );
}
