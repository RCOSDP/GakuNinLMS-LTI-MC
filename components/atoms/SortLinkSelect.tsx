import { useCallback } from "react";
import MenuItem from "@mui/material/MenuItem";
import type { SelectChangeEvent } from "@mui/material/Select";
import Select from "$atoms/Select";
import type { SortLinkOrder } from "$server/models/sortLinkOrder";

const options: ReadonlyArray<{
  value: SortLinkOrder;
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
    value: "title",
    label: "名前順（A-Z）",
  },
  {
    value: "reverse-title",
    label: "名前順（Z-A）",
  },
];

type Props<Order extends SortLinkOrder> = Parameters<typeof Select>[0] & {
  onSortChange?(value: Order): void;
};

export default function SortLinkSelect<Order extends SortLinkOrder>(
  props: Props<Order>
) {
  const { onSortChange, ...other } = props;
  const defaultValue = options[0].value;
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
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
}
