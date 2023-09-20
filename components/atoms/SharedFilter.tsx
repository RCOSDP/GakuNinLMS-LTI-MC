import { useCallback } from "react";
import type { SxProps } from "@mui/system";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import type { SharedFilterType } from "$types/sharedFilter";

const options: ReadonlyArray<{
  value: SharedFilterType;
  label: string;
}> = [
  { value: "true", label: "あり" },
  { value: "false", label: "なし" },
  { value: "all", label: "すべて" },
];

type Props = {
  value?: SharedFilterType;
  sx?: SxProps;
  disabled?: boolean;
  onFilterChange?: (value: SharedFilterType) => void;
  row?: boolean | undefined;
};

function SharedFilter({
  value = options[2].value,
  sx,
  disabled = false,
  onFilterChange,
  row,
}: Props) {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onFilterChange?.(event.target.value as SharedFilterType);
    },
    [onFilterChange]
  );
  return (
    <FormControl component="fieldset" sx={sx}>
      <FormLabel component="legend">共有</FormLabel>
      <RadioGroup value={value} onChange={handleChange} row={row}>
        {options.map(({ value, label }) => (
          <FormControlLabel
            key={value}
            value={value}
            control={<Radio color="primary" size="small" />}
            label={label}
            disabled={disabled}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

export default SharedFilter;
