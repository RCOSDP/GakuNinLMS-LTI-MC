import { ComponentProps, FormEvent, useCallback } from "react";
import clsx from "clsx";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import makeStyles from "@mui/styles/makeStyles";
import SearchIcon from "@mui/icons-material/Search";
import SearchClearButton from "./SearchClearButton";
import Divider from "@mui/material/Divider";
import gray from "$theme/colors/gray";

// NOTE: https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/OutlinedInput/OutlinedInput.js

const useOutlinedInputStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
    borderRadius: "1.25rem",
    paddingRight: theme.spacing(2),
    "&:hover $notchedOutline": {
      borderColor: gray[500],
      borderWidth: "1px",
    },
    "@media (hover: none)": {
      "&:hover $notchedOutline": {
        borderColor: gray[500],
      },
    },
    "&$focused $notchedOutline": {
      borderColor: theme.palette.primary.main,
      borderWidth: "1px",
    },
  },
  input: {
    height: "1.25rem",
    padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
    paddingRight: 0,
  },
  focused: {},
  notchedOutline: {
    borderColor: gray[500],
    transition: theme.transitions.create(["border-color"]),
  },
}));

const useInputLabelStyles = makeStyles((theme) => ({
  outlined: {
    transform: `translate(${theme.spacing(2)}, 10px)`,
  },
}));

const useStyles = makeStyles(() => ({
  hide: {
    visibility: "hidden",
  },
  divider: { height: 28, margin: 4 },
}));
type Props = {
  value: string;
  onSearchInput: (input: string) => void;
  onSearchInputReset: () => void;
} & Omit<ComponentProps<typeof TextField>, "value">;

export default function SearchTextField({
  onSearchInput,
  onSearchInputReset,
  ...props
}: Props) {
  const outlinedInputClasses = useOutlinedInputStyles();
  const inputLabelClasses = useInputLabelStyles();
  const classes = useStyles();
  const handleInput = useCallback(
    (event: FormEvent<HTMLInputElement>) => {
      onSearchInput?.(event.currentTarget.value);
    },
    [onSearchInput]
  );
  return (
    <div>
      <TextField
        variant="outlined"
        inputProps={{
          onInput: handleInput,
          ...props.inputProps,
        }}
        InputProps={{
          classes: outlinedInputClasses,
          endAdornment: (
            <InputAdornment position="end">
              <SearchClearButton
                onClick={onSearchInputReset}
                className={clsx({
                  [classes.hide]: !props.value,
                })}
              />
              <Divider orientation="vertical" className={classes.divider} />
              <SearchIcon style={{ color: gray[700] }} />
            </InputAdornment>
          ),
          ...props.InputProps,
        }}
        InputLabelProps={{
          classes: inputLabelClasses,
          ...props.InputLabelProps,
        }}
        {...props}
      />
    </div>
  );
}
