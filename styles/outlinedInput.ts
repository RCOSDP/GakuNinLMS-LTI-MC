import type { Theme } from "@mui/material/styles";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import { inputBaseClasses } from "@mui/material/InputBase";
import gray from "theme/colors/gray";

const outlinedInput = (theme: Theme) => ({
  [`.${outlinedInputClasses.root}`]: {
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${gray[500]}`,
    borderRadius: "6px",
    fontSize: "1rem",
    transition: theme.transitions.create(["border-color"]),
    [`&.${outlinedInputClasses.focused}`]: {
      borderColor: theme.palette.primary.main,
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
