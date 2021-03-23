import { makeStyles } from "@material-ui/core/styles";
import LearningStatusDot from "$atoms/LearningStatusDot";
import type { AnalysisDetail } from "$server/models/analysisDetail";
import type { LearningStatus } from "$server/models/learningStatus";

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
  analysisDetail: AnalysisDetail;
};

export default function AnalysisDetailItem(props: Props) {
  const { analysisDetail } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <span className={classes.name}>{analysisDetail.user.name}</span>
      <div className={classes.graph}>
        {analysisDetail.data.map((item, index) => (
          <LearningStatusDot key={index} type={item.status as LearningStatus} />
        ))}
      </div>
    </div>
  );
}
