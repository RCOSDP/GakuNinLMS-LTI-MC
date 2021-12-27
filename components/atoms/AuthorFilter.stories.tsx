import type { Story } from "@storybook/react";
import AuthorFilter from "./AuthorFilter";

export default { title: "atoms/AuthorFilter", component: AuthorFilter };

const Template: Story<Parameters<typeof AuthorFilter>[0]> = (args) => (
  <AuthorFilter {...args} />
);

export const Default = Template.bind({});
