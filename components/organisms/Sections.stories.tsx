import type { Story } from "@storybook/react";
import Sections from "./Sections";
import { sections } from "samples";

export default { title: "organisms/Sections", component: Sections };

const Template: Story<Parameters<typeof Sections>[0]> = (args) => (
  <Sections {...args} />
);

export const Default = Template.bind({});
Default.args = {
  sections,
  index: [0, 0],
  isContentEditable: () => false,
};
