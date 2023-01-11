import type { Story } from "@storybook/react";
import AppBar from "./AppBar";
import { session } from "$samples";

export default { title: "organisms/AppBar", component: AppBar };

const Template: Story<Parameters<typeof AppBar>[0]> = (args) => (
  <AppBar {...args} />
);

export const Default = Template.bind({});
Default.args = {
  position: "static",
  session,
};
