import type { ComponentProps } from "react";
import type { Story } from "@storybook/react";
import VideoEditor from "./VideoEditor";

export default {
  title: "molecules/VideoEditor",
  component: VideoEditor,
};

export const Default: Story<ComponentProps<typeof VideoEditor>> =
  VideoEditor.bind({});
Default.args = {
  startTimeInputProps: {},
  stopTimeInputProps: {},
  startTimeMax: 0.001,
  stopTimeMin: 0.001,
  stopTimeMax: 0.001,
  startTimeError: false,
  stopTimeError: false,
};
