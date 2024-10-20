import clsx from "clsx";
import makeStyles from "@mui/styles/makeStyles";
import { gray } from "$theme/colors";
import type { BookSchema } from "$server/models/book";
import type { TopicSchema } from "$server/models/topic";
import type { ActivityRewatchRateProps } from "$server/validators/activityRewatchRate";
import { round } from "$server/utils/math";

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 4,
    display: "flex",
    alignItems: "center",
  },
  row: {
    width: "100%",
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
        averageCompleteRate: number;
      }
    >;
  };
  rewatchRates: Array<ActivityRewatchRateProps>;
};

type TopicProps = {
  topic: Pick<TopicSchema, "id" | "name" | "timeRequired"> & {
    averageCompleteRate: number;
  };
  averageRewatchRate: number;
};

function getAverageRewatchRate(
  rewatchRates: Array<ActivityRewatchRateProps>,
  topicId: number
) {
  const topicRewatchRates =
    rewatchRates.filter((r) => topicId === r.topicId) ?? [];

  const averageRewatchRate =
    topicRewatchRates
      ?.map((r: ActivityRewatchRateProps) => r.rewatchRate ?? 0)
      .reduce((a, b) => {
        return a + b;
      }, 0) / topicRewatchRates.length ?? 0;

  return round(averageRewatchRate, -3);
}

export default function BookAndTopicActivityItem(props: BookAndTopicProps) {
  const { book, rewatchRates } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.row}>
        <h4>{book.name}</h4>
        {book.activitiesByTopics.map((topic, index) => (
          <TopicActivityItem
            key={index}
            topic={topic}
            averageRewatchRate={getAverageRewatchRate(rewatchRates, topic.id)}
          />
        ))}
      </div>
    </div>
  );
}

export function TopicActivityItem(props: TopicProps) {
  const { topic, averageRewatchRate } = props;
  const classes = useStyles();

  return (
    <div className={classes.topic}>
      <div className={clsx(classes.name, classes.titleColumn)}>
        {topic.name}
      </div>
      <div className={clsx(classes.column)}>{topic.timeRequired}</div>
      <div className={clsx(classes.column)}>{topic.averageCompleteRate}</div>
      <div className={clsx(classes.column)}>{averageRewatchRate}</div>
    </div>
  );
}
