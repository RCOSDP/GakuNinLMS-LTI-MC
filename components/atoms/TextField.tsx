import { ComponentProps } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MuiTextField from "@material-ui/core/TextField";
import gray from "@theme/colors/gray";

const useInputStyles = makeStyles((theme) => ({
  input: {
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${gray[500]}`,
    borderRadius: 6,
    fontSize: 16,
    padding: "10px 12px",
    position: "relative",
    transition: theme.transitions.create(["border-color"]),
    width: "auto",
    "&:focus": {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const useInputLabelStyles = makeStyles({
  root: {
    color: gray[700],
    fontSize: 16,
  },
  formControl: {
    position: "static",
  },
  shrink: {
    transform: "none",
  },
});

export default function TextField(props: ComponentProps<typeof MuiTextField>) {
  const inputClasses = useInputStyles();
  const inputLabelClasses = useInputLabelStyles();
  return (
    <MuiTextField
      InputProps={{ classes: inputClasses, disableUnderline: true }}
      InputLabelProps={{ classes: inputLabelClasses, shrink: true }}
      {...props}
    />
  );
}
