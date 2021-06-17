import clsx from "clsx";
import { TopicSchema } from "$server/models/topic";
import formatDuration from "date-fns/formatDuration";
import intervalToDuration from "date-fns/intervalToDuration";
import ja from "date-fns/locale/ja";
import Markdown from "react-markdown";
import gfm from "remark-gfm";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import type { LinkProps } from "@material-ui/core/Link";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import Video from "$organisms/Video";
import DescriptionList from "$atoms/DescriptionList";
import useSticky from "$utils/useSticky";
import languages from "$utils/languages";
import getLocaleDateString from "$utils/getLocaleDateString";
import { NEXT_PUBLIC_VIDEO_MAX_HEIGHT } from "$utils/env";
import { gray } from "$theme/colors";

function MarkdownLink<Element extends React.ElementType>(
  props: LinkProps<Element>
) {
  return <Link target="_blank" rel="noreferrer" {...props} />;
}

function formatInterval(start: Date | number, end: Date | number) {
  const duration = intervalToDuration({ start, end });
  return formatDuration(duration, { locale: ja });
}

const useStyles = makeStyles((theme) => ({
  video: {
    marginRight: theme.spacing(-3),
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(-3),
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
  title: {
    marginBottom: theme.spacing(0.5),
  },
  items: {
    "& > *": {
      display: "inline-block",
      marginRight: theme.spacing(1.25),
      marginBottom: theme.spacing(0.25),
    },
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

export default function TopicViewerContent(props: Props) {
  const { topic, onEnded, offset } = props;
  const classes = useStyles();
  const theme = useTheme();
  const sticky = useSticky({
    offset: offset ?? theme.spacing(-2),
  });
  const components = {
    a: MarkdownLink,
  };
  return (
    <>
      {"providerUrl" in topic.resource && (
        <Video
          className={clsx(classes.video, sticky)}
          {...topic.resource}
          onEnded={onEnded}
          autoplay
        />
      )}
      <Typography className={classes.title} variant="h6">
        {topic.name}
      </Typography>
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
            key: "作成者",
            value: topic.creator.name,
          },
        ]}
      />
      <article className={classes.description}>
        <Markdown remarkPlugins={[gfm]} components={components}>
          {topic.description}
        </Markdown>
      </article>
    </>
  );
}
