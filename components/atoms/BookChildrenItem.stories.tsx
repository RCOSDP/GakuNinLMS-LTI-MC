import type { Story } from "@storybook/react";
import BookChildrenItem from "./BookChildrenItem";

export default {
  title: "atoms/BookChildrenItem",
  component: BookChildrenItem,
};

const Template: Story<Parameters<typeof BookChildrenItem>[0]> = (args) => (
  <BookChildrenItem {...args} />
);

export const Default = Template.bind({});
Default.args = { variant: "section", name: "セクション" };
