import type { Story } from "@storybook/react";
import TopicForm from "./TopicForm";
import { topic } from "$samples";
import { useVideoTrackAtom } from "$store/videoTrack";
import type {
  VideoTrackProps,
  VideoTrackSchema,
} from "$server/models/videoTrack";

export default { title: "organisms/TopicForm", component: TopicForm };

const Template: Story<Parameters<typeof TopicForm>[0]> = (args) => {
  const { addVideoTrack, deleteVideoTrack } = useVideoTrackAtom();
  const handleSubtitleSubmit =
    (handler: (videoTrack: VideoTrackSchema) => void) =>
    (videoTrackProps: VideoTrackProps) => {
      const { language, content } = videoTrackProps;
      handler({
        id: new Date().getTime(),
        kind: "subtitles",
        language,
        url: URL.createObjectURL(new Blob([content])),
        accessToken: "",
      });
    };
  return (
    <TopicForm
      {...args}
      onSubtitleDelete={({ id }) => deleteVideoTrack(id)}
      onSubtitleSubmit={handleSubtitleSubmit(addVideoTrack)}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  topic,
};
