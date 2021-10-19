import makeStyles from "@mui/styles/makeStyles";

// TODO: makeStylesからstyledに移行したい

const select = makeStyles((theme) => ({
  select: {
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing(1.25, 1.75),
    "&:focus": {
      borderRadius: "6px",
    },
  },
}));

export default select;
