import makeStyles from "@mui/styles/makeStyles";
import gray from "theme/colors/gray";

const input = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${gray[500]}`,
    borderRadius: "6px",
    fontSize: "1rem",
    transition: theme.transitions.create(["border-color"]),
  },
  input: {
    height: "100%",
    padding: theme.spacing(1.25, 1.75),
  },
  formControl: {
    "label + &": {
      marginTop: theme.spacing(1.25),
    },
  },
  multiline: {
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${gray[500]}`,
    borderRadius: "6px",
    padding: theme.spacing(1.25, 1.75),
    transition: theme.transitions.create(["border-color"]),
  },
  inputMultiline: {
    padding: 0,
  },
  notchedOutline: {
    display: "none",
  },
  focused: {
    "&$root, &$multiline": {
      borderColor: theme.palette.primary.main,
    },
  },
}));

export default input;
