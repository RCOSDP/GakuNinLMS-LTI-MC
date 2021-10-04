import makeStyles from "@mui/styles/makeStyles";

const accordionSummary = makeStyles((theme) => ({
  root: {
    flexDirection: "row-reverse",
  },
  content: {
    alignItems: "center",
    margin: theme.spacing(1, 0),
    "&$expanded": {
      margin: theme.spacing(1, 0),
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
