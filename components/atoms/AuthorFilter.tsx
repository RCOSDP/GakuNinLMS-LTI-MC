import { useCallback } from "react";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import makeStyles from "@mui/styles/makeStyles";
import { gray } from "$theme/colors";
import type { AuthorFilterType } from "$server/models/authorFilter";

const useStyles = makeStyles((theme) => ({
  fieldset: {
    display: "inline-flex",
    marginTop: "-0.375rem",
    padding: theme.spacing(0),
    backgroundColor: "white",
    border: "1px solid",
    borderColor: gray[500],
    borderRadius: 8,
  },
  legend: {
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(-1),
    color: gray[700],
    fontSize: "0.75rem",
  },
  group: {
    "& > :first-child": {
      marginLeft: 0,
    },
    "& > :not(:last-child)": {
      marginRight: theme.spacing(1.5),
    },
  },
}));

const useFormControlLabelStyles = makeStyles((theme) => ({
  label: {
    color: gray[800],
    fontSize: "0.875rem",
    marginLeft: theme.spacing(-0.5),
  },
}));

const options: ReadonlyArray<{
  value: AuthorFilterType;
  label: string;
}> = [
  { value: "self", label: "自分" },
  { value: "other", label: "自分以外" },
  { value: "all", label: "すべて" },
];

type Props = {
  disabled?: boolean;
  onFilterChange?: (value: AuthorFilterType) => void;
};

function AuthorFilter(props: Props) {
  const { disabled = false, onFilterChange } = props;
  const classes = useStyles();
  const formControlLabelClasses = useFormControlLabelStyles();
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onFilterChange?.(event.target.value as AuthorFilterType);
    },
    [onFilterChange]
  );
  return (
    <fieldset className={classes.fieldset}>
      <legend className={classes.legend}>著者</legend>
      <RadioGroup
        className={classes.group}
        defaultValue={options[0].value}
        onChange={handleChange}
        row
      >
        {options.map(({ value, label }) => (
          <FormControlLabel
            key={value}
            classes={formControlLabelClasses}
            value={value}
            control={<Radio color="primary" size="small" />}
            label={label}
            disabled={disabled}
          />
        ))}
      </RadioGroup>
    </fieldset>
  );
}

export default AuthorFilter;
