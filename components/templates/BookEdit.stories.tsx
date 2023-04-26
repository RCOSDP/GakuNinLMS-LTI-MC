import type { StoryObj } from "@storybook/react";
import BookEdit from "./BookEdit";
import { book } from "samples";

export default {
  component: BookEdit,
  parameters: { layout: "fullscreen" },
};

export const Default: StoryObj<typeof BookEdit> = {
  args: {
    book,
  },
};
