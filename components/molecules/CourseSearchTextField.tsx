import { useState, useCallback } from "react";
import type { TextFieldProps } from "@mui/material/TextField";
import SearchTextField from "$atoms/SearchTextField";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import type { LinkSearchTarget } from "$types/linkSearchTarget";

const options: ReadonlyArray<{
  value: LinkSearchTarget;
  label: string;
}> = [
  { value: "all", label: "すべて" },
  { value: "linkTitle", label: "リンク" },
  { value: "bookName", label: "ブック" },
  { value: "topicName", label: "トピック" },
];

type Props = Omit<TextFieldProps, "variant" | "value"> & {
  target: LinkSearchTarget;
  onSearchSubmit(value: string): void;
  onSearchTargetChange: (target: LinkSearchTarget) =>void;
};

function CourseSearchTextField({ target, onSearchSubmit,onSearchTargetChange, ...props }: Props) {
  const [value, setValue] = useState("");
  const reset = useCallback(() => {
    setValue("");
    onSearchSubmit("");
  }, [setValue, onSearchSubmit]);
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onSearchTargetChange(event.target.value as LinkSearchTarget);
    },
    [onSearchTargetChange]
  );

  return (
    <div>
      <SearchTextField
        {...props}
        value={value}
        onSearchInput={setValue}
        onSearchInputReset={reset}
        onSearchSubmit={onSearchSubmit}
      />
      <RadioGroup
        id="search-type"
        value={target}
        onChange={handleChange}
        row
      >
        {options.map(({ value, label }) => (
          <FormControlLabel
            key={value}
            value={value}
            control={<Radio color="primary" size="small" />}
            label={label}
          />
        ))}
      </RadioGroup>
    </div>
  );
}

export default CourseSearchTextField;
