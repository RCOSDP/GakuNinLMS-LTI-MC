import { ComponentProps } from "react";
import TextField from "@mui/material/TextField";
import makeStyles from "@mui/styles/makeStyles";
import gray from "$theme/colors/gray";

const useOutlinedInputStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
    "&:hover $notchedOutline": {
      borderColor: gray[200],
      borderWidth: "1px",
    },
    "@media (hover: none)": {
      "&:hover $notchedOutline": {
        borderColor: gray[200],
      },
    },
    "&$focused $notchedOutline": {
      borderColor: theme.palette.primary.main,
      borderWidth: "1px",
    },
  },
  input: {
    height: "1.25rem",
    padding: theme.spacing(1),
  },
  focused: {},
  notchedOutline: {
    borderColor: gray[200],
    transition: theme.transitions.create(["border-color"]),
  },
}));

const useInputLabelStyles = makeStyles((theme) => ({
  outlined: {
    transform: `translate(${theme.spacing(1)}, 10px)`,
  },
}));

export default function SectionTextField(
  props: ComponentProps<typeof TextField>
) {
  const outlinedInputClasses = useOutlinedInputStyles();
  const inputLabelClasses = useInputLabelStyles();
  return (
    <div>
      <TextField
        variant="outlined"
        InputProps={{
          classes: outlinedInputClasses,
        }}
        InputLabelProps={{ classes: inputLabelClasses }}
        {...props}
      />
    </div>
  );
}
