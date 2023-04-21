import type { StoryObj } from "@storybook/react";
import ReleasedBook from "./ReleasedBook";
import { book } from "$samples";

export default {
  component: ReleasedBook,
  parameters: {
    layout: "fullscreen",
  },
};

export const Default: StoryObj<typeof ReleasedBook> = {
  args: {
    book,
  },
};
