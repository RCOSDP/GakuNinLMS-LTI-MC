import type { Theme } from "@mui/material";
import { inputLabelClasses } from "@mui/material/InputLabel";
import gray from "theme/colors/gray";

const inputLabel = (theme: Theme) => ({
  [`.${inputLabelClasses.root}`]: {
    color: gray[700],
    fontSize: theme.typography.body1.fontSize,
    [`&.${inputLabelClasses.focused}`]: {
      color: theme.palette.primary.main,
    },
  },
  [`.${inputLabelClasses.formControl}`]: {
    position: "static",
  },
  [`.${inputLabelClasses.shrink}`]: {
    transform: "none",
  },
  [`.${inputLabelClasses.required}`]: {
    ".RequiredDot": {
      display: "inline",
      marginLeft: theme.spacing(0.5),
      marginBottom: theme.spacing(0.75),
    },
    [`.${inputLabelClasses.asterisk}`]: {
      display: "none",
    },
  },
  ".RequiredDot": {
    display: "none",
  },
});

export default inputLabel;
