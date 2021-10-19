import Autocomplete, { autocompleteClasses } from "@mui/material/Autocomplete";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import { styled } from "@mui/material/styles";

export default styled(Autocomplete)(({ theme }) => ({
  [`.${outlinedInputClasses.root}`]: {
    padding: 0,
    [`.${autocompleteClasses.input}`]: {
      padding: theme.spacing(1.25, 1.75),
    },
  },
}));
