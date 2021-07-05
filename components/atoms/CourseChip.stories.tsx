import type { Story } from "@storybook/react";
import CourseChip from "./CourseChip";
import { ltiResourceLink } from "$samples";

export default {
  title: "atoms/CourseChip",
  component: CourseChip,
};

const Template: Story<Parameters<typeof CourseChip>[0]> = (args) => (
  <CourseChip {...args} />
);

export const Default = Template.bind({});
Default.args = { ltiResourceLink };
