import type { Story } from "@storybook/react";

import DescriptionList from "./DescriptionList";

export default { title: "atoms/DescriptionList", component: DescriptionList };

const Template: Story<Parameters<typeof DescriptionList>[0]> = (args) => (
  <DescriptionList {...args} />
);

export const Default = Template.bind({});
Default.args = {
  value: [...Array(10)].fill({ key: "key", value: "value" }),
};
