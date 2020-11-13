export default { title: "atoms/TextField" };
import TextField from "./TextField";
import MuiTextField from "@material-ui/core/TextField";

export const Default = () => (
  <TextField defaultValue="customized text field" label="customized label" />
);

export const MaterialUi = () => (
  <MuiTextField defaultValue="original text field" label="original label" />
);
