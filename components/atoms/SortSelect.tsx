import { useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import MuiSelect from "@material-ui/core/Select";
import useSelectStyles from "styles/select";
import useInputStyles from "styles/input";
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

type Props = Parameters<typeof MuiSelect>[0] & {
  onSortChange?(value: SortOrder): void;
};

export default function SortSelect(props: Props) {
  const { onSortChange, ...other } = props;
  const selectClasses = useSelectStyles();
  const inputClasses = useInputStyles();
  const [value, setValue] = useState<SortOrder>("updated");
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setValue(event.target.value as SortOrder);
    onSortChange(value);
  };
  return (
    <MuiSelect
      classes={{ ...selectClasses, root: inputClasses.input }}
      disableUnderline={true}
      value={value}
      onChange={handleChange}
      {...other}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </MuiSelect>
  );
}
