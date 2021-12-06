import type { Story } from "@storybook/react";
import ContentTypeIndicator from "./ContentTypeIndicator";

export default {
  title: "atoms/ContentTypeIndicator",
  component: ContentTypeIndicator,
};

const Template: Story<Parameters<typeof ContentTypeIndicator>[0]> = (args) => (
  <ContentTypeIndicator {...args} />
);

export const Default = Template.bind({});
Default.args = {
  type: "book",
};
