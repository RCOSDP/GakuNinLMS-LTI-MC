import type { StoryObj } from "@storybook/react";
import SectionsTreeView from "./SectionsTreeView";
import { book } from "$samples";

export default { component: SectionsTreeView };

export const Default: StoryObj<typeof SectionsTreeView> = {
  args: {
    bookId: book.id,
    sections: book.sections,
  },
};
