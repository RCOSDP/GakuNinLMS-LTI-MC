import { makeStyles } from "@material-ui/core/styles";
import { gray } from "theme/colors";

const appBar = makeStyles({
  root: {
    borderBottom: `1px solid ${gray[400]}`,
    boxShadow: "none",
  },
  colorDefault: {
    backgroundColor: "#fff",
  },
});

export default appBar;
