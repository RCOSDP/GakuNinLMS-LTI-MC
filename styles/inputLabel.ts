import { makeStyles } from "@material-ui/core/styles";
import gray from "theme/colors/gray";

const inputLabel = makeStyles((theme) => ({
  root: {
    color: gray[700],
    fontSize: 16,
    "& .RequiredDot": {
      display: "none",
    },
    "&$required .RequiredDot": {
      display: "inline",
      marginLeft: theme.spacing(0.5),
      marginBottom: theme.spacing(0.75),
    },
    "&$required $asterisk": {
      display: "none",
    },
  },
  formControl: {
    position: "static",
  },
  shrink: {
    transform: "none",
  },
  required: {},
  asterisk: {},
}));

export default inputLabel;
