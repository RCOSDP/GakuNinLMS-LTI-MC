export default { title: "atoms/TextField" };
import { useState, ChangeEvent } from "react";
import TextField from "./TextField";
import MuiTextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

export const Default = () => (
  <TextField defaultValue="customized text field" label="customized label" />
);

export const Required = () => (
  <TextField
    defaultValue="customized text field"
    label="customized label"
    required
  />
);

export const Select = () => {
  const options = [{ value: "a" }, { value: "b" }, { value: "c" }] as const;
  const [value, setValue] = useState("a");
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <TextField
      select
      value={value}
      onChange={handleChange}
      label="customized label"
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.value}
        </MenuItem>
      ))}
    </TextField>
  );
};

export const MaterialUi = () => (
  <MuiTextField defaultValue="original text field" label="original label" />
);
