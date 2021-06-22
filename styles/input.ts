import { makeStyles } from "@material-ui/core/styles";
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
    padding: `${theme.spacing(1.25)}px ${theme.spacing(1.75)}px`,
  },
  formControl: {
    "label + &": {
      marginTop: `${theme.spacing(1.25)}px`,
    },
  },
  multiline: {
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${gray[500]}`,
    borderRadius: "6px",
    padding: `${theme.spacing(1.25)}px ${theme.spacing(1.75)}px`,
    transition: theme.transitions.create(["border-color"]),
  },
  inputMultiline: {
    padding: 0,
  },
  focused: {
    "&$root, &$multiline": {
      borderColor: theme.palette.primary.main,
    },
  },
}));

export default input;
