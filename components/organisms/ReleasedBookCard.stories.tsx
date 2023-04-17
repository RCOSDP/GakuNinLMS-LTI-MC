import type { StoryObj } from "@storybook/react";
import ReleasedBookCard from "./ReleasedBookCard";
import { book, release } from "$samples";

export default { component: ReleasedBookCard };

export const Default: StoryObj<typeof ReleasedBookCard> = {
  args: {
    book: {
      ...book,
      ltiResourceLinks: [],
    },
    release,
  },
};
