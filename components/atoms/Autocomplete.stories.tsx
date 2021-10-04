import type { Story } from "@storybook/react";
import Autocomplete from "./Autocomplete";
import TextField from "$atoms/TextField";

export default { title: "atoms/Autocomplete", complete: Autocomplete };

const Template: Story<Parameters<typeof Autocomplete>[0]> = (args) => (
  <Autocomplete {...args} />
);

export const Default = Template.bind({});
Default.args = {
  options: [
    {
      label: "ラベル",
    },
  ],
  renderInput: (params) => <TextField {...params} />,
};
