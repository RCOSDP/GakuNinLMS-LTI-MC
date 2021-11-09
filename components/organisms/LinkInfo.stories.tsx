import type { Story } from "@storybook/react";
import LinkInfo from "./LinkInfo";
import { book } from "$samples";

export default { title: "organisms/LinkInfo", component: LinkInfo };

const Template: Story<Parameters<typeof LinkInfo>[0]> = (args) => (
  <LinkInfo {...args} />
);

export const Default = Template.bind({});
Default.args = {
  book,
};
