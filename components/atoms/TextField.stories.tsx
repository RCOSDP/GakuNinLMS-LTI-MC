import type { Story } from "@storybook/react";
import TextField from "./TextField";
import MenuItem from "@mui/material/MenuItem";

export default { title: "atoms/TextField", component: TextField };

const Template: Story<Parameters<typeof TextField>[0]> = (args) => {
  const options = [{ value: "a" }, { value: "b" }, { value: "c" }] as const;
  return (
    <TextField {...args} defaultValue={args.select ? "a" : args.defaultValue}>
      {args.select &&
        options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.value}
          </MenuItem>
        ))}
    </TextField>
  );
};

export const Default = Template.bind({});
Default.args = {
  defaultValue: "customized text field",
  label: "customized label",
  multiline: false,
  required: false,
  select: false,
};
