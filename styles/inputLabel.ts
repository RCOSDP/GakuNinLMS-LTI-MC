import makeStyles from "@mui/styles/makeStyles";
import gray from "theme/colors/gray";

// TODO: makeStylesからstyledに移行したい

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
