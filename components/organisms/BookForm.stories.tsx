import type { Story } from "@storybook/react";
import BookForm from "./BookForm";
import { book } from "samples";

export default { title: "organisms/BookForm", component: BookForm };

const Template: Story<Parameters<typeof BookForm>[0]> = (args) => {
  return <BookForm {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  book,
};
