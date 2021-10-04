import makeStyles from "@mui/styles/makeStyles";
import common from "@mui/material/colors/common";

const select = makeStyles((theme) => ({
  select: {
    backgroundColor: common.white,
    padding: theme.spacing(1.25, 1.75),
    "&:focus": {
      borderRadius: "6px",
    },
  },
}));

export default select;
