import type { Story } from "@storybook/react";
import BookEdit from "./BookEdit";
import { book } from "samples";

export default {
  title: "templates/BookEdit",
  component: BookEdit,
  parameters: { layout: "fullscreen" },
};

const Template: Story<Parameters<typeof BookEdit>[0]> = (args) => {
  return <BookEdit {...args} isContentEditable={() => true} />;
};

export const Default = Template.bind({});
Default.args = {
  book,
};
