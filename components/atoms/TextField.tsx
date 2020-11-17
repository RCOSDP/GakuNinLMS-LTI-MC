import { ComponentProps } from "react";
import MuiTextField from "@material-ui/core/TextField";
import RequiredDot from "atoms/RequiredDot";
import useTextFieldStyles from "styles/textField";
import useInputStyles from "styles/input";
import useInputLabelStyles from "styles/inputLabel";
import useSelectStyles from "styles/select";

export default function TextField(props: ComponentProps<typeof MuiTextField>) {
  const textFieldClasses = useTextFieldStyles();
  const inputClasses = useInputStyles();
  const inputLabelClasses = useInputLabelStyles();
  const selectClasses = useSelectStyles();
  const { label } = props;
  return (
    <MuiTextField
      classes={textFieldClasses}
      InputProps={{ classes: inputClasses, disableUnderline: true }}
      InputLabelProps={{ classes: inputLabelClasses, shrink: true }}
      SelectProps={{ classes: selectClasses }}
      {...props}
      label={
        <span>
          {label}
          <RequiredDot />
        </span>
      }
    />
  );
}
