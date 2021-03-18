import { useState } from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import { gray } from "$theme/colors";

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
  },
}));

const useFormControlLabelStyles = makeStyles({
  label: {
    color: gray[800],
    fontSize: "0.875rem",
  },
});

const filter = ["none", "self", "other", "all"] as const;

type Filter = typeof filter[number];

enum FilterFlags {
  Self = 1 << 0,
  Other = 1 << 1,
}

type Props = {
  disabled?: boolean;
  onFilterChange?: (value: Filter) => void;
};

function CreatorFilter(props: Props) {
  const { disabled = false, onFilterChange } = props;
  const classes = useStyles();
  const formControlLabelClasses = useFormControlLabelStyles();
  const [flags, setFlags] = useState<FilterFlags>(
    FilterFlags.Self | FilterFlags.Other
  );
  const handleChange = (flag: FilterFlags) => () => {
    const newFlags = flags ^ flag;
    setFlags(newFlags);
    onFilterChange?.(filter[newFlags]);
  };
  return (
    <fieldset className={classes.fieldset}>
      <legend className={classes.legend}>作成者</legend>
      <FormGroup className={classes.group} row>
        <FormControlLabel
          classes={formControlLabelClasses}
          control={
            <Checkbox
              color="primary"
              size="small"
              checked={Boolean(flags & FilterFlags.Self)}
              onChange={handleChange(FilterFlags.Self)}
            />
          }
          label="自分"
          disabled={disabled}
        />
        <FormControlLabel
          classes={formControlLabelClasses}
          control={
            <Checkbox
              color="primary"
              size="small"
              checked={Boolean(flags & FilterFlags.Other)}
              onChange={handleChange(FilterFlags.Other)}
            />
          }
          label="自分以外"
          disabled={disabled}
        />
      </FormGroup>
    </fieldset>
  );
}

export default CreatorFilter;
