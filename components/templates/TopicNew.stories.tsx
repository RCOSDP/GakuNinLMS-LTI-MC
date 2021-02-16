export default { title: "templates/TopicNew" };

import TopicNew from "./TopicNew";
import { useVideoTrackAtom } from "$store/videoTrack";

const handlers = {
  onSubmit: console.log,
  onCancel: () => console.log("back"),
};

// TODO: Please use <Provider> の問題の回避。なぜか回避できる。
function wrap(WrappedComponent: React.FC) {
  function Component() {
    return <WrappedComponent />;
  }
  return Component;
}

export const Default = wrap(() => {
  const { addVideoTrack, deleteVideoTrack } = useVideoTrackAtom();
  return (
    <TopicNew
      onSubtitleDelete={deleteVideoTrack}
      onSubtitleSubmit={addVideoTrack}
      {...handlers}
    />
  );
});
