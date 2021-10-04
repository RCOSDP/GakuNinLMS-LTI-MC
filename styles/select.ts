import makeStyles from "@mui/styles/makeStyles";

const select = makeStyles({
  select: {
    padding: 0,
    "&:focus": {
      borderRadius: "6px",
    },
  },
});

export default select;
