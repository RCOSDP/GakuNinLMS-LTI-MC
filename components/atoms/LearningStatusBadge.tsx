import { ReactNode } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import { learningStatus } from "$theme/colors";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.common.white,
      backgroundColor: learningStatus["completed"],
    },
  })
);

function LearningStatusBadge(props: { label: ReactNode }) {
  const classes = useStyles();
  return <Chip className={classes.root} size="small" label={props.label} />;
}

export default LearningStatusBadge;
