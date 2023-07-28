import type { Story } from "@storybook/react";
import DeepLinkBooks from "./DeepLinkBooks";
import { book, books } from "samples";

export default {
  title: "templates/DeepLinkBooks",
  parameters: { layout: "fullscreen" },
  component: DeepLinkBooks,
};

const linkedBook = { ...book, editable: true };

const Template: Story<Parameters<typeof DeepLinkBooks>[0]> = (args) => (
  <>
    <DeepLinkBooks {...args} />
  </>
);

export const Default = Template.bind({});
Default.args = {
  linkedBook,
  totalCount: 123,
  contents: books.map((book) => ({ type: "book", ...book })),
};

export const Empty = Template.bind({});
Empty.args = {
  totalCount: 0,
  contents: [],
};
