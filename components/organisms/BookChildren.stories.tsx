import type { Story } from "@storybook/react";
import BookChildren from "./BookChildren";
import { sections } from "samples";

export default { title: "organisms/BookChildren", component: BookChildren };

const Template: Story<Parameters<typeof BookChildren>[0]> = (args) => (
  <BookChildren {...args} />
);

export const Default = Template.bind({});
Default.args = {
  sections,
  index: [0, 0],
  isTopicEditable: () => false,
};
