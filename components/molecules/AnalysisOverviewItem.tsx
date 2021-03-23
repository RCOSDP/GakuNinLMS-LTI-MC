import { makeStyles } from "@material-ui/core/styles";
import LearningStatusDot from "$atoms/LearningStatusDot";
import { learningStatus } from "$theme/colors";
import type { AnalysisOverview } from "$server/models/analysisOverview";

function AnalysisBargraph(props: AnalysisOverview) {
  const { completed, incompleted, unopened } = props;
  const total = completed + incompleted + unopened;
  const getPercentage = (value: number): string => `${(value / total) * 100}%`;
  return (
    <svg viewBox="0 0 200 10">
      <rect
        x="0"
        y="0"
        width={getPercentage(completed)}
        height="100%"
        fill={learningStatus["completed"]}
      />
      <rect
        x={getPercentage(completed)}
        y="0"
        width={getPercentage(incompleted)}
        height="100%"
        fill={learningStatus["incompleted"]}
      />
      <rect
        x={getPercentage(completed + incompleted)}
        y="0"
        width={getPercentage(unopened)}
        height="100%"
        fill={learningStatus["unopened"]}
      />
    </svg>
  );
}

const useStyles = makeStyles({
  root: {
    display: "flex",
  },
  name: {
    flex: 1,
  },
  graph: { maxWidth: "50%" },
});

type Props = {
  analysisOverview: AnalysisOverview;
};

export default function AnalysisOverviewItem(props: Props) {
  const { analysisOverview } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <span className={classes.name}>{analysisOverview.name}</span>
      <div className={classes.graph}>
        <AnalysisBargraph {...analysisOverview} />
        <div>
          <LearningStatusDot type="completed" />
          <span>完了{analysisOverview.completed}人</span>
          <LearningStatusDot type="incompleted" />
          <span>未完了{analysisOverview.incompleted}人</span>
          <LearningStatusDot type="unopened" />
          <span>未開封{analysisOverview.unopened}人</span>
        </div>
      </div>
    </div>
  );
}
