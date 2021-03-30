import clsx from "clsx";
import { TopicSchema } from "$server/models/topic";
import { format, formatDuration, intervalToDuration } from "date-fns";
import { ja } from "date-fns/locale";
import Typography from "@material-ui/core/Typography";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import Video from "$organisms/Video";
import Item from "$atoms/Item";
import useStickyProps from "$utils/useStickyProps";
import languages from "$utils/languages";
import { gray } from "$theme/colors";

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
    whiteSpace: "pre-wrap",
  },
}));

type Props = {
  topic: TopicSchema;
  onEnded?: () => void;
  top?: number;
  dialog?: boolean;
};

export default function TopicViewerContent(props: Props) {
  const { topic, onEnded, dialog = false, top } = props;
  const classes = useStyles();
  const theme = useTheme();
  const { classes: stickyClasses, scroll, desktop, mobile } = useStickyProps({
    backgroundColor: "transparent",
    top: top ?? theme.spacing(-2),
    zIndex: 1,
    dialog,
  });
  return (
    <>
      {"providerUrl" in topic.resource && (
        <Video
          className={clsx(
            classes.video,
            stickyClasses.sticky,
            { [stickyClasses.scroll]: scroll },
            { [stickyClasses.desktop]: desktop },
            { [stickyClasses.mobile]: mobile }
          )}
          {...topic.resource}
          onEnded={onEnded}
          autoplay
        />
      )}
      <Typography className={classes.title} variant="h6">
        {topic.name}
      </Typography>
      <div className={classes.items}>
        <Typography variant="body1">
          学習時間 {formatInterval(0, topic.timeRequired * 1000) || "10秒未満"}
        </Typography>
        <Typography variant="body1">{languages[topic.language]}</Typography>
        {/* TODO: トピックがライセンスをプロパティに持つようになったら表示してください
        <Typography variant="body1">
          ライセンス
        </Typography>
        */}
      </div>
      <div className={classes.items}>
        <Item itemKey="作成日" value={format(topic.createdAt, "yyyy.MM.dd")} />
        <Item itemKey="更新日" value={format(topic.updatedAt, "yyyy.MM.dd")} />
        <Item itemKey="作成者" value={topic.creator.name} />
      </div>
      <p className={classes.description}>{topic.description}</p>
    </>
  );
}
