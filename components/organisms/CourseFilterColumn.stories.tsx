import type { Story } from "@storybook/react";
import CourseFilterColumn from "./CourseFilterColumn";

export default {
  title: "organisms/CourseFilterColumn",
  component: CourseFilterColumn,
};

const Template: Story<Parameters<typeof CourseFilterColumn>[0]> = (args) => (
  <CourseFilterColumn {...args} />
);

export const Default = Template.bind({});
Default.args = {
  clientIds: ["test"],
};
