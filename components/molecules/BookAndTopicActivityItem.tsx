import clsx from "clsx";
import makeStyles from "@mui/styles/makeStyles";
import { gray } from "$theme/colors";
import type { BookSchema } from "$server/models/book";
import type { TopicSchema } from "$server/models/topic";

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 4,
    display: "flex",
    alignItems: "center",
  },
  name: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    color: gray[700],
    marginRight: theme.spacing(1),
  },
  topic: {
    flex: 1,
    display: "flex",
    color: gray[700],
  },
  titleColumn: {
    width: "70%",
    alignItems: "center",
  },
  column: {
    display: "flex",
    width: "10%",
    alignItems: "center",
    justifyContent: "center",
  },
}));

type BookAndTopicProps = {
  book: Pick<BookSchema, "id" | "name"> & {
    activitiesByTopics: Array<
      Pick<TopicSchema, "id" | "name" | "timeRequired"> & {
        averageTime: number;
        timeRatio: number;
      }
    >;
  };
};

type TopicProps = {
  topic: Pick<TopicSchema, "id" | "name" | "timeRequired"> & {
    averageTime: number;
    timeRatio: number;
  };
};

export default function BookAndTopicActivityItem(props: BookAndTopicProps) {
  const { book } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>
        <h4>{book.name}</h4>
        {book.activitiesByTopics.map((topic, index) => (
          <TopicActivityItem key={index} topic={topic} />
        ))}
      </div>
    </div>
  );
}

export function TopicActivityItem(props: TopicProps) {
  const { topic } = props;
  const classes = useStyles();

  return (
    <div className={classes.topic}>
      <div className={clsx(classes.name, classes.titleColumn)}>
        {topic.name}
      </div>
      <div className={clsx(classes.column)}>{topic.timeRequired}</div>
      <div className={clsx(classes.column)}>{topic.averageTime}</div>
      <div className={clsx(classes.column)}>{topic.timeRatio}</div>
    </div>
  );
}
