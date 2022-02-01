import type { Story } from "@storybook/react";
import SharedFilter from "./SharedFilter";

export default { title: "atoms/SharedFilter", component: SharedFilter };

const Template: Story<Parameters<typeof SharedFilter>[0]> = (args) => (
  <SharedFilter {...args} />
);

export const Default = Template.bind({});
