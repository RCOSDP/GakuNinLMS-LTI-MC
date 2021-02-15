import TopicForm from "./TopicForm";
import { topic } from "samples";
import type { VideoTrackSchema } from "$server/models/videoTrack";

export default { title: "organisms/TopicForm" };

const defaultProps = {
  topic,
  onSubmit: console.log,
  onSubtitleDelete: console.log,
  onSubtitleSubmit: () =>
    new Promise<VideoTrackSchema>((resolve) => {
      resolve({
        ...topic.resource.tracks[0],
        id: new Date().getTime(),
      });
    }),
};

export const Default = () => <TopicForm {...defaultProps} />;
