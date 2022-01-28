import type { Story } from "@storybook/react";
import BookNew from "./BookNew";
import { book } from "$samples";

export default {
  title: "templates/BookNew",
  parameters: { layout: "fullscreen" },
  component: BookNew,
};

const Template: Story<Parameters<typeof BookNew>[0]> = (args) => (
  <BookNew {...args} />
);

export const Default = Template.bind({});
Default.args = {};

export const Fork = Template.bind({});
Fork.args = { book };
