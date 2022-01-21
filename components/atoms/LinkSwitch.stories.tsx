import type { Story } from "@storybook/react";
import LinkSwitch from "./LinkSwitch";

export default { title: "atoms/LinkSwitch", component: LinkSwitch };

const Template: Story<Parameters<typeof LinkSwitch>[0]> = (args) => (
  <LinkSwitch {...args} />
);

export const Default = Template.bind({});
