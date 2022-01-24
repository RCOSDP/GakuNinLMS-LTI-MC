import { useCallback } from "react";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import SearchTextField from "$atoms/SearchTextField";
import type { SearchTarget } from "$types/searchTarget";

const options: ReadonlyArray<{
  value: SearchTarget;
  label: string;
}> = [
  { value: "all", label: "すべて" },
  { value: "description", label: "解説" },
  { value: "name", label: "タイトル" },
  { value: "author", label: "作成者" },
  { value: "keyword", label: "キーワード" },
];

type Props = Parameters<typeof SearchTextField>[0] & {
  target?: SearchTarget;
  onSearchTargetChange: (value: SearchTarget) => void;
};

export default function Search({
  target = options[0].value,
  onSearchTargetChange,
  ...other
}: Props) {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onSearchTargetChange(event.target.value as SearchTarget);
    },
    [onSearchTargetChange]
  );
  return (
    <div>
      <SearchTextField {...other} />
      <RadioGroup id="search-type" value={target} onChange={handleChange} row>
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
