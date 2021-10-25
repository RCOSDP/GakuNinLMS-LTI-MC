import { styled } from "@mui/material/styles";
import MuiInputLabel, { inputLabelClasses } from "@mui/material/InputLabel";
import inputLabel from "$styles/inputLabel";

const InputLabel = styled(MuiInputLabel)(({ theme }) => {
  const { [`.${inputLabelClasses.root}`]: root, ...other } = inputLabel(theme);
  return {
    "&": root,
    ...other,
  };
});

export default InputLabel;
