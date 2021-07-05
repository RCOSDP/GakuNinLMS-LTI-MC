import type { Story } from "@storybook/react";
import MenuBookOutlinedIcon from "@material-ui/icons/MenuBookOutlined";
import AppBarNavButton from "./AppBarNavButton";

export default {
  title: "atoms/AppBarNavButton",
  component: AppBarNavButton,
};

const Template: Story<Parameters<typeof AppBarNavButton>[0]> = (args) => (
  <AppBarNavButton {...args} />
);

export const Default = Template.bind({});
Default.args = {
  icon: <MenuBookOutlinedIcon />,
  label: "ブック",
};
