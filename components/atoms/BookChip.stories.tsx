import type { Story } from "@storybook/react";
import BookChip from "./BookChip";
import { relatedBook } from "$samples";

export default {
  title: "atoms/BookChip",
  component: BookChip,
};

const Template: Story<Parameters<typeof BookChip>[0]> = (args) => (
  <BookChip {...args} />
);

export const Default = Template.bind({});
Default.args = { relatedBook };
