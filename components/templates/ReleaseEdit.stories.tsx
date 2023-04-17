import type { StoryObj } from "@storybook/react";
import ReleaseEdit from "./ReleaseEdit";
import { book, release } from "$samples";

export default {
  component: ReleaseEdit,
  parameters: {
    layout: "fullscreen",
  },
};

export const Create: StoryObj<typeof ReleaseEdit> = {
  args: {
    book,
    release: {},
  },
};

export const Update: StoryObj<typeof ReleaseEdit> = {
  args: {
    book,
    release,
  },
};
