import type { Story } from "@storybook/react";
import License from "./License";

export default { title: "atoms/License", component: License };

const Template: Story<Parameters<typeof License>[0]> = (args) => (
  <License {...args} />
);

export const Default = Template.bind({});
Default.args = {
  license: "CC-BY-4.0",
};
