import type { Theme } from "@mui/material/styles";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import { inputBaseClasses } from "@mui/material/InputBase";
import { grey } from "@mui/material/colors";

const outlinedInput = (theme: Theme) => ({
  [`.${outlinedInputClasses.root}`]: {
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${grey[300]}`,
    borderRadius: "6px",
    fontSize: "1rem",
    transition: theme.transitions.create(["border-color"]),
    [`&.${outlinedInputClasses.focused}`]: {
      borderColor: theme.palette.primary.main,
    },
    [`&.${outlinedInputClasses.error}`]: {
      borderColor: theme.palette.error.main,
    },
  },
  [`.${outlinedInputClasses.input}`]: {
    height: "100%",
    padding: theme.spacing(1.25, 1.75),
  },
  [`.${outlinedInputClasses.notchedOutline}`]: {
    display: "none",
  },
  [`.${inputBaseClasses.multiline}`]: {
    padding: 0,
  },
  [`.${inputBaseClasses.inputMultiline}`]: {
    padding: theme.spacing(1.25, 1.75),
  },
});

export default outlinedInput;
