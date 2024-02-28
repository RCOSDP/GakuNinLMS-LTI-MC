import type { Meta, StoryObj } from "@storybook/react";
import BookmarkMultiSelect from "./BookmarkMultiSelect";
import { bookmarkTagMenu } from "$samples";

export default {
  component: BookmarkMultiSelect,
} satisfies Meta<typeof BookmarkMultiSelect>;

type Story = StoryObj<typeof BookmarkMultiSelect>;

export const Default: Story = {
  render: () => (
    <BookmarkMultiSelect
      tags={bookmarkTagMenu}
      onTagSelect={(bookmarkTagMenu) =>
        console.log("select tag", bookmarkTagMenu)
      }
      onClickMemoContent={() => console.log("click memoContent")}
    />
  ),
};
