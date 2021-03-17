import clsx from "clsx";
import { TopicSchema } from "$server/models/topic";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import TopicViewerContent from "$molecules/TopicViewerContent";
import useCardStyles from "styles/card";

const useStyles = makeStyles({
  root: {
    overflow: "visible",
  },
});

type Props = {
  className?: string;
  topic: TopicSchema;
  onEnded?: () => void;
  top?: number;
};

export default function TopicViewer(props: Props) {
  const classes = useStyles();
  const cardClasses = useCardStyles();
  const { className, topic, onEnded, top } = props;
  return (
    <Card classes={cardClasses} className={clsx(classes.root, className)}>
      <TopicViewerContent topic={topic} onEnded={onEnded} top={top} />
    </Card>
  );
}
