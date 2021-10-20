import type { Theme } from "@mui/material";
import { selectClasses } from "@mui/material/Select";

const select = (theme: Theme) => ({
  [`.${selectClasses.select}`]: {
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing(1.25, 1.75),
    "&:focus": {
      borderRadius: "6px",
    },
  },
});

export default select;
