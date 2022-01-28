import type { Story } from "@storybook/react";
import MenuItem from "@mui/material/MenuItem";
import Select from "./Select";

export default { title: "atoms/Select", component: Select };

const Template: Story<Parameters<typeof Select>[0]> = (args) => {
  const options = [{ value: "a" }, { value: "b" }, { value: "c" }] as const;
  return (
    <Select {...args}>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.value}
        </MenuItem>
      ))}
    </Select>
  );
};

export const Default = Template.bind({});
Default.args = {
  defaultValue: "a",
};
