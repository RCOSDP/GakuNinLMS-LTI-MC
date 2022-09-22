import type { Story } from "@storybook/react";
import TopicEdit from "./TopicEdit";
import { topic } from "$samples";
import { useVideoTrackAtom } from "$store/videoTrack";
import type {
  VideoTrackProps,
  VideoTrackSchema,
} from "$server/models/videoTrack";

export default {
  title: "templates/TopicEdit",
  parameters: { layout: "fullscreen" },
  component: TopicEdit,
};

const Template: Story<Parameters<typeof TopicEdit>[0]> = (args) => {
  const { addVideoTrack, deleteVideoTrack } = useVideoTrackAtom();
  const handleSubtitleSubmit =
    (handler: (videoTrack: VideoTrackSchema) => void) =>
    (videoTrackProps: VideoTrackProps) => {
      const { language, content } = videoTrackProps;
      handler({
        id: Date.now(),
        kind: "subtitles",
        language,
        url: URL.createObjectURL(new Blob([content])),
        accessToken: "",
      });
    };
  return (
    <TopicEdit
      {...args}
      onSubtitleDelete={({ id }) => deleteVideoTrack(id)}
      onSubtitleSubmit={handleSubtitleSubmit(addVideoTrack)}
    />
  );
};

export const Default = Template.bind({});
Default.args = { topic };
