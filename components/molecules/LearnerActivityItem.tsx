import { makeStyles } from "@material-ui/core/styles";
import LearningStatusDot from "$atoms/LearningStatusDot";
import { gray } from "$theme/colors";
import type { LearnerActivitySchema } from "$server/models/learnerActivity";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  name: {
    flexShrink: 0,
    color: gray[700],
    fontSize: "1rem",
    width: "10rem",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    marginRight: "1rem",
  },
  dots: {
    whiteSpace: "nowrap",
    "& > :not(:last-child)": {
      marginRight: theme.spacing(1),
    },
  },
}));

type Props = {
  learnerActivity: LearnerActivitySchema;
};

export default function LearnerActivityItem(props: Props) {
  const { learnerActivity } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <span className={classes.name}>{learnerActivity.name}</span>
      <div className={classes.dots}>
        {
          // TODO: divでヒートマップの要素を表現すると重いので1行分のグラフはひとつのsvgで表現する
          learnerActivity.activities.map((activity, index) => (
            <LearningStatusDot
              key={index}
              type={activity.completed ? "completed" : "incompleted"}
              size="large"
            />
          ))
        }
      </div>
    </div>
  );
}
