import TopicForm from "./TopicForm";
import { topic } from "samples";
import { useVideoTrackAtom } from "$store/videoTrack";
import type {
  VideoTrackProps,
  VideoTrackSchema,
} from "$server/models/videoTrack";

export default { title: "organisms/TopicForm" };

const handlers = {
  onSubmit: console.log,
};

// TODO: Please use <Provider> の問題の回避。なぜか回避できる。
function wrap(WrappedComponent: React.FC) {
  function Component() {
    return <WrappedComponent />;
  }
  return Component;
}

const handleSubtitleSubmit = (
  handler: (videoTrack: VideoTrackSchema) => void
) => (videoTrackProps: VideoTrackProps) => {
  const { language, content } = videoTrackProps;
  handler({
    id: new Date().getTime(),
    kind: "subtitles",
    language,
    url: URL.createObjectURL(new Blob([content])),
  });
};

export const Default = wrap(() => {
  const { addVideoTrack, deleteVideoTrack } = useVideoTrackAtom();
  return (
    <TopicForm
      topic={topic}
      onSubtitleDelete={deleteVideoTrack}
      onSubtitleSubmit={handleSubtitleSubmit(addVideoTrack)}
      {...handlers}
    />
  );
});
