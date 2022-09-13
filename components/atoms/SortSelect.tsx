import { useCallback } from "react";
import MenuItem from "@mui/material/MenuItem";
import type { SelectChangeEvent } from "@mui/material/Select";
import Select from "$atoms/Select";
import type { SortOrder } from "$server/models/sortOrder";

const defaultOptions: ReadonlyArray<{
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

type Props<Order extends SortOrder> = Parameters<typeof Select>[0] & {
  onSortChange?(value: Order): void;
  options?: typeof defaultOptions;
};

export default function SortSelect<Order extends SortOrder>(
  props: Props<Order>
) {
  const { onSortChange, options, ...other } = props;
  const items = options ?? defaultOptions;
  const defaultValue = items[0].value;
  const handleChange = useCallback(
    (event: SelectChangeEvent<unknown>) => {
      onSortChange?.(event.target.value as Order);
    },
    [onSortChange]
  );
  return (
    <Select
      defaultValue={defaultValue}
      disabled={!onSortChange}
      onChange={handleChange}
      {...other}
    >
      {items.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
}
