import { makeStyles } from "@material-ui/core/styles";

const select = makeStyles({
  select: {
    "&:focus": {
      borderRadius: "6px",
    },
  },
});

export default select;
