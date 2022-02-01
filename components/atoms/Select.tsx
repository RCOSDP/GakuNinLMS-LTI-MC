import MuiSelect from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import { grey } from "@mui/material/colors";
import select from "$styles/select";

const Select = styled(MuiSelect)(({ theme }) => ({
  [`.${outlinedInputClasses.notchedOutline}`]: {
    borderColor: grey[300],
  },
  ...select(theme),
}));

export default Select;
