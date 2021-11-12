import makeStyles from "@mui/styles/makeStyles";
import gray from "theme/colors/gray";

const card = makeStyles((theme) => ({
  root: {
    border: `1px solid ${gray[400]}`,
    borderRadius: 12,
    boxShadow: "none",
    padding: theme.spacing(2, 3),
  },
}));

export default card;
