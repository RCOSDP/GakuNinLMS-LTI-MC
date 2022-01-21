import type { Story } from "@storybook/react";
import SearchPagination from "./SearchPagination";

export default {
  title: "organisms/SearchPagination",
  component: SearchPagination,
};

const Template: Story<Parameters<typeof SearchPagination>[0]> = (args) => (
  <SearchPagination {...args} />
);

export const Default = Template.bind({});
Default.args = {};
