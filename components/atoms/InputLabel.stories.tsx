import type { Story } from "@storybook/react";
import InputLabel from "./InputLabel";

export default { title: "atoms/InputLabel", component: InputLabel };

const Template: Story<Parameters<typeof InputLabel>[0]> = (args) => (
  <InputLabel {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: "Label",
};
