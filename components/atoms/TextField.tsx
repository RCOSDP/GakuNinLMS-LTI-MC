import type { ComponentProps } from "react";
import type { OutlinedInputProps } from "@mui/material/OutlinedInput";
import MuiTextField from "@mui/material/TextField";
import RequiredDot from "$atoms/RequiredDot";
import useTextFieldStyles from "styles/textField";
import useInputStyles from "styles/input";
import useInputLabelStyles from "styles/inputLabel";
import useSelectStyles from "styles/select";

export default function TextField(props: ComponentProps<typeof MuiTextField>) {
  const textFieldClasses = useTextFieldStyles();
  const inputClasses = useInputStyles();
  const inputLabelClasses = useInputLabelStyles();
  const selectClasses = useSelectStyles();
  const { InputProps, InputLabelProps, SelectProps, label } = props;
  return (
    <MuiTextField
      classes={textFieldClasses}
      {...props}
      InputProps={
        {
          ...InputProps,
          classes: inputClasses,
        } as Exclude<typeof InputProps, Partial<OutlinedInputProps> | undefined>
      }
      InputLabelProps={{
        ...InputLabelProps,
        classes: inputLabelClasses,
        shrink: true,
      }}
      SelectProps={{
        ...SelectProps,
        classes: selectClasses,
      }}
      label={
        <span>
          {label}
          <RequiredDot />
        </span>
      }
    />
  );
}
