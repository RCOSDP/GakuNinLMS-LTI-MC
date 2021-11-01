import type { Story } from "@storybook/react";
import Input from "./Input";

export default { title: "atoms/Input", component: Input };

const Template: Story<Parameters<typeof Input>[0]> = (args) => (
  <Input {...args} />
);

export const Default = Template.bind({});
Default.args = {};
