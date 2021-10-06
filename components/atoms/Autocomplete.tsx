import Autocomplete from "@mui/material/Autocomplete";
import { styled } from "@mui/material/styles";

export default styled(Autocomplete)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    padding: 0,
    "& .MuiAutocomplete-input": {
      padding: theme.spacing(1.25, 1.75),
    },
  },
}));
