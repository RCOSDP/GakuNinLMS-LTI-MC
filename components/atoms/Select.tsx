import MuiSelect from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import select from "$styles/select";

const Select = styled(MuiSelect)(({ theme }) => select(theme));

export default Select;
