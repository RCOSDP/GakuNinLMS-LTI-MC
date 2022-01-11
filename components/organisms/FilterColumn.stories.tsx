import type { Story } from "@storybook/react";
import FilterColumn from "./FilterColumn";

export default { title: "organisms/FilterColumn", component: FilterColumn };

const Template: Story<Parameters<typeof FilterColumn>[0]> = (args) => (
  <FilterColumn {...args} />
);

export const Default = Template.bind({});
