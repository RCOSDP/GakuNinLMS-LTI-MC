import type { Story } from "@storybook/react";
import ActionHeader from "./ActionHeader";
import Button from "@mui/material/Button";

export default { title: "organisms/ActionHeader", component: ActionHeader };

const Template: Story<Parameters<typeof ActionHeader>[0]> = (args) => (
  <ActionHeader {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: (
    <Button color="primary" variant="contained">
      ボタン
    </Button>
  ),
};
