import MuiAutocomplete, {
  autocompleteClasses,
} from "@mui/material/Autocomplete";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import { styled } from "@mui/material/styles";

const Autocomplete = styled(MuiAutocomplete)(({ theme }) => ({
  [`.${outlinedInputClasses.root}`]: {
    padding: 0,
    [`.${autocompleteClasses.input}`]: {
      padding: theme.spacing(1.25, 1.75),
    },
  },
}));

export default Autocomplete;
