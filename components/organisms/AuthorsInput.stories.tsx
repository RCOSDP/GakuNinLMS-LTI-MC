import type { Story } from "@storybook/react";
import AuthorsInput from "./AuthorsInput";
import { author } from "$samples";

export default { title: "organisms/AuthorsInput", component: AuthorsInput };

const Template: Story<Parameters<typeof AuthorsInput>[0]> = (args) => (
  <AuthorsInput {...args} />
);

export const Default = Template.bind({});
Default.args = { authors: [author] };
