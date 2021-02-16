export default { title: "templates/TopicEdit" };

import TopicEdit from "./TopicEdit";
import { topic } from "samples";
import { useVideoTrackAtom } from "$store/videoTrack";
import type {
  VideoTrackProps,
  VideoTrackSchema,
} from "$server/models/videoTrack";

const handlers = {
  onSubmit: console.log,
  onDelete: console.log,
  onCancel: () => console.log("back"),
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
    <TopicEdit
      topic={topic}
      onSubtitleDelete={deleteVideoTrack}
      onSubtitleSubmit={handleSubtitleSubmit(addVideoTrack)}
      {...handlers}
    />
  );
});

export const Empty = wrap(() => {
  const { addVideoTrack, deleteVideoTrack } = useVideoTrackAtom();
  return (
    <TopicEdit
      topic={null}
      onSubtitleDelete={deleteVideoTrack}
      onSubtitleSubmit={handleSubtitleSubmit(addVideoTrack)}
      {...handlers}
    />
  );
});
