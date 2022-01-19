import type { Story } from "@storybook/react";
import Search from "./Search";
import { useSearchAtom } from "$store/search";

export default {
  title: "organisms/Search",
  component: Search,
};

const Template: Story<Parameters<typeof Search>[0]> = (args) => {
  const {
    query,
    target,
    onSearchInput,
    onSearchInputReset,
    onSearchTargetChange,
  } = useSearchAtom();
  return (
    <Search
      {...args}
      value={query.q}
      target={target}
      onSearchInput={onSearchInput}
      onSearchInputReset={onSearchInputReset}
      onSearchTargetChange={onSearchTargetChange}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  label: "ブックの検索",
};
