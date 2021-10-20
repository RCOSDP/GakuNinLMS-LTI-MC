import { styled } from "@mui/material/styles";
import MuiInputLabel from "@mui/material/InputLabel";
import inputLabel from "$styles/inputLabel";

const InputLabel = styled(MuiInputLabel)(({ theme }) => inputLabel(theme));

export default InputLabel;
