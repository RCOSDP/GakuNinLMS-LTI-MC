import { makeStyles } from "@material-ui/core/styles";

const accordionSummary = makeStyles((theme) => ({
  root: {
    flexDirection: "row-reverse",
  },
  content: {
    alignItems: "center",
    margin: `${theme.spacing(1)}px 0`,
    "&$expanded": {
      margin: `${theme.spacing(1)}px 0`,
    },
  },
  expanded: {},
  expandIcon: {
    transform: "rotate(-90deg)",
    "&$expanded": {
      transform: "rotate(0deg)",
    },
  },
}));

export default accordionSummary;
