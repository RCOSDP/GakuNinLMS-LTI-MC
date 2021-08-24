import clsx from "clsx";
import { TopicSchema } from "$server/models/topic";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import Video from "$organisms/Video";
import VideoPlayer from "$organisms/Video/VideoPlayer";
import DescriptionList from "$atoms/DescriptionList";
import Markdown from "$atoms/Markdown";
import useSticky from "$utils/useSticky";
import getLocaleDateString from "$utils/getLocaleDateString";
import formatInterval from "$utils/formatInterval";
import { NEXT_PUBLIC_VIDEO_MAX_HEIGHT } from "$utils/env";
import { isVideoResource } from "$utils/videoResource";
import { useVideoAtom } from "$store/video";
import { gray } from "$theme/colors";

const useStyles = makeStyles((theme) => ({
  video: {
    margin: theme.spacing(-2, -3, 2),
    backgroundColor: gray[800],
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
  },
  hidden: {
    width: 0,
    margin: 0,
    "& *": {
      visibility: "hidden",
    },
  },
  header: {
    "& > *": {
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(0.5),
    },
  },
  title: {
    display: "inline-block",
    verticalAlign: "middle",
  },
  description: {
    margin: theme.spacing(2.5, 0, 2),
  },
}));

type Props = {
  topic: TopicSchema;
  onEnded?: () => void;
  offset?: number;
};

export default function TopicViewerContent({ topic, onEnded, offset }: Props) {
  const classes = useStyles();
  const theme = useTheme();
  const sticky = useSticky({
    offset: offset ?? theme.spacing(-2),
  });
  const { video } = useVideoAtom();
  return (
    <>
      {Array.from(video.values()).map((videoInstance) => (
        <VideoPlayer
          key={videoInstance.url}
          className={clsx(classes.video, sticky, {
            [classes.hidden]: topic.resource.url != videoInstance.url,
          })}
          videoInstance={videoInstance}
          onEnded={onEnded}
        />
      ))}
      {video.size === 0 && isVideoResource(topic.resource) && (
        <Video
          className={clsx(classes.video, sticky)}
          {...topic.resource}
          onEnded={onEnded}
          autoplay
        />
      )}
      <header className={classes.header}>
        <Typography className={classes.title} variant="h6">
          {topic.name}
        </Typography>
        <Chip
          label={`学習時間 ${formatInterval(0, topic.timeRequired * 1000)}`}
        />
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
          {
            key: "トピック作成者",
            value: topic.creator.name,
          },
        ]}
      />
      <article className={classes.description}>
        <Markdown>{topic.description}</Markdown>
      </article>
    </>
  );
}
