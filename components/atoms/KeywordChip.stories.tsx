import type { Story } from "@storybook/react";
import KeywordChip from "./KeywordChip";

export default { title: "atoms/KeywordChip", component: KeywordChip };

const Template: Story<Parameters<typeof KeywordChip>[0]> = (args) => (
  <KeywordChip {...args} />
);

export const Default = Template.bind({});

Default.args = {
  keyword: { name: "キーワード" },
};
