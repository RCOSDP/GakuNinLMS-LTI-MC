import type { Story } from "@storybook/react";
import SearchTextField from "./SearchTextField";
import { useSearchAtom } from "$store/search";

export default {
  title: "atoms/SearchTextField",
  component: SearchTextField,
};

const Template: Story<Parameters<typeof SearchTextField>[0]> = (args) => {
  const { query, onSearchInput, onSearchInputReset } = useSearchAtom();
  return (
    <SearchTextField
      {...args}
      value={query.q}
      onSearchInput={onSearchInput}
      onSearchInputReset={onSearchInputReset}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  label: "ブックの検索",
};
