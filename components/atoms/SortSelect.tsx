import { useCallback } from "react";
import MenuItem from "@mui/material/MenuItem";
import type { SelectChangeEvent } from "@mui/material/Select";
import Select from "$atoms/Select";
import type { SortOrder } from "$server/models/sortOrder";

const options: ReadonlyArray<{
  value: SortOrder;
  label: string;
}> = [
  {
    value: "updated",
    label: "更新日順（新しい）",
  },
  {
    value: "reverse-updated",
    label: "更新日順（古い）",
  },
  {
    value: "created",
    label: "作成日順（新しい）",
  },
  {
    value: "reverse-created",
    label: "作成日順（古い）",
  },
  {
    value: "name",
    label: "名前順（A-Z）",
  },
  {
    value: "reverse-name",
    label: "名前順（Z-A）",
  },
];

type Props = Parameters<typeof Select>[0] & {
  onSortChange?(value: SortOrder): void;
};

export default function SortSelect(props: Props) {
  const { onSortChange, ...other } = props;
  const handleChange = useCallback(
    (event: SelectChangeEvent<unknown>) => {
      onSortChange?.(event.target.value as SortOrder);
    },
    [onSortChange]
  );
  return (
    <Select
      defaultValue={options[0].value}
      disabled={!onSortChange}
      onChange={handleChange}
      {...other}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
}
