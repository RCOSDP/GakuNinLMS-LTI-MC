import makeStyles from "@mui/styles/makeStyles";

// TODO: makeStylesからstyledに移行したい

const treeItem = makeStyles({
  label: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    lineHeight: 2.5,
  },
});

export default treeItem;
