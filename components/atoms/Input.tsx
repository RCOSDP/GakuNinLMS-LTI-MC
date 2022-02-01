import { styled } from "@mui/material/styles";
import OutlinedInput, {
  outlinedInputClasses,
} from "@mui/material/OutlinedInput";
import outlinedInput from "$styles/outlinedInput";

const Input = styled(OutlinedInput)(({ theme }) => {
  const { [`.${outlinedInputClasses.root}`]: root, ...other } =
    outlinedInput(theme);
  return {
    "&": root,
    ...other,
  };
});

export default Input;
