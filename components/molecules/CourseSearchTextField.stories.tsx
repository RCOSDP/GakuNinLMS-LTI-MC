import type { Story } from "@storybook/react";
import CourseSearchTextField from "./CourseSearchTextField";

export default {
  title: "molecules/CourseSearchTextField",
  component: CourseSearchTextField,
};

const Template: Story<Parameters<typeof CourseSearchTextField>[0]> = (args) => (
  <CourseSearchTextField {...args} />
);

export const Default = Template.bind({});
