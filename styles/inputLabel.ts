import { makeStyles } from "@material-ui/core/styles";
import gray from "theme/colors/gray";

const inputLabel = makeStyles({
  root: {
    color: gray[700],
    fontSize: 16,
  },
  formControl: {
    position: "static",
  },
  shrink: {
    transform: "none",
  },
});

export default inputLabel;
