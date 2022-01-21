import type { Story } from "@storybook/react";
import KeywordsInput from "./KeywordsInput";

export default { title: "organisms/KeywordsInput", component: KeywordsInput };

const Template: Story<Parameters<typeof KeywordsInput>[0]> = (args) => (
  <KeywordsInput {...args} />
);

export const Default = Template.bind({});
Default.args = {
  keywords: [{ name: "キーワード" }, { name: "ちびチロ" }],
};
