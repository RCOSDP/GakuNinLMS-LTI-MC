import type { ComponentProps } from "react";
import type { Story } from "@storybook/react";
import SkipButton from "./SkipButton";

export default {
  title: "molecules/SkipButton",
  component: SkipButton,
};

export const Default: Story<ComponentProps<typeof SkipButton>> =
  SkipButton.bind({});
Default.args = {
  variant: "start",
};
