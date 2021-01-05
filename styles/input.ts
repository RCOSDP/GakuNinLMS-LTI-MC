import { makeStyles } from "@material-ui/core/styles";
import gray from "theme/colors/gray";

const input = makeStyles((theme) => ({
  input: {
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${gray[500]}`,
    borderRadius: "6px",
    height: "100%",
    fontSize: "1rem",
    padding: `${theme.spacing(1.25)}px ${theme.spacing(1.75)}px`,
    transition: theme.transitions.create(["border-color"]),
    "&:focus": {
      borderColor: theme.palette.primary.main,
    },
  },
  formControl: {
    "label + &": {
      marginTop: `${theme.spacing(1.25)}px`,
    },
  },
  multiline: {
    padding: 0,
  },
}));

export default input;
