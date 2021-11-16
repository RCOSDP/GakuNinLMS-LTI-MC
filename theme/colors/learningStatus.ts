import { green, grey } from "@mui/material/colors";

// NOTE: a11yの観点で明度のみによる識別ができるよう上から明度が昇順になっている
const learningStatus = {
  completed: green[900],
  incompleted: green[300],
  unopened: grey[300],
};

export default learningStatus;
