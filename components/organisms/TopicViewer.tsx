import clsx from "clsx";
import type { TopicSchema } from "$server/models/topic";
import Card from "@mui/material/Card";
import makeStyles from "@mui/styles/makeStyles";
import TopicViewerContent from "$organisms/TopicViewerContent";
import useCardStyles from "$styles/card";
import type { BookActivitySchema } from "$server/models/bookActivity";
import type { SessionSchema } from "$server/models/session";

const useStyles = makeStyles({
  root: {
    overflow: "visible",
  },
});

type Props = {
  className?: string;
  topic: TopicSchema;
  onEnded?: () => void;
  offset?: string;
  bookActivities: BookActivitySchema[];
  userId: SessionSchema["user"]["id"];
};

export default function TopicViewer({
  className,
  topic,
  onEnded,
  offset,
  bookActivities,
  userId,
}: Props) {
  const classes = useStyles();
  const cardClasses = useCardStyles();
  const activity = bookActivities.find((bookActivity) => {
    return (
      bookActivity.topic.id === topic.id && bookActivity.learner.id === userId
    );
  });
  console.log(activity);
  return (
    <Card classes={cardClasses} className={clsx(classes.root, className)}>
      <TopicViewerContent topic={topic} onEnded={onEnded} offset={offset} />
    </Card>
  );
}
