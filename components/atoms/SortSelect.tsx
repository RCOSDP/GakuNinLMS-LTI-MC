import { useState, ChangeElement } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import MuiSelect from "@material-ui/core/Select";
import useSelectStyles from "styles/select";
import useInputStyles from "styles/input";

const options = [
  {
    value: "name-descend",
    label: "名前順（A-Z）",
  },
  {
    value: "name-ascend",
    label: "名前順（Z-A）",
  },
  {
    value: "created-at-descend",
    label: "作成日順（新しい）",
  },
  {
    value: "created-at-ascend",
    label: "作成日順（古い）",
  },
  {
    value: "updated-at-descend",
    label: "更新日順（新しい）",
  },
  {
    value: "updated-at-ascend",
    label: "更新日順（古い）",
  },
];

export default function Select() {
  const selectClasses = useSelectStyles();
  const inputClasses = useInputStyles();
  const [value, setValue] = useState("name-descend");
  const handleChange = (event: ChangeElement<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  return (
    <MuiSelect
      classes={{ ...selectClasses, root: inputClasses.input }}
      disableUnderline={true}
      value={value}
      onChange={handleChange}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </MuiSelect>
  );
}
