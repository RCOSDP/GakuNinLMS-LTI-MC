import { makeStyles } from "@material-ui/core/styles";

const accordionSummary = makeStyles({
  root: {
    flexDirection: "row-reverse",
  },
  content: {
    alignItems: "center",
  },
  expanded: {},
  expandIcon: {
    transform: "rotate(-90deg)",
    "&$expanded": {
      transform: "rotate(0deg)",
    },
  },
});

export default accordionSummary;
