import type { Story } from "@storybook/react";
import TopicNew from "./TopicNew";
import { useVideoTrackAtom } from "$store/videoTrack";
import { topic } from "$samples";

export default {
  title: "templates/TopicNew",
  parameters: { layout: "fullscreen" },
  component: TopicNew,
};

const Template: Story<Parameters<typeof TopicNew>[0]> = (args) => {
  const { addVideoTrack, deleteVideoTrack } = useVideoTrackAtom();
  return (
    <TopicNew
      {...args}
      onSubtitleDelete={({ id }) => deleteVideoTrack(id)}
      onSubtitleSubmit={addVideoTrack}
    />
  );
};

export const Default = Template.bind({});
Default.args = {};

export const Fork = Template.bind({});
Fork.args = { topic };
