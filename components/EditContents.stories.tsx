export default { title: "EditContents" };
import { useState } from "react";
import { EditContents } from "./EditContents";
import { reorder } from "./reorder";
import { produce } from "immer";
import { Contents } from "./contents";

export const Basic = () => {
  const [contents, setContents] = useState<Contents>({
    id: 42,
    title: "Contents title",
    videos: [2, 5, 7, 9].map((id) => ({ id, title: `Sample video ${id}` })),
    state: "success",
  });
  function onVideoDragEnd(source: number, destination: number) {
    setContents((contents) =>
      produce(contents, (draft) => {
        draft.videos = reorder(draft.videos, source, destination);
      })
    );
  }
  function onEditVideo(index: number, title: string) {
    setContents((contents) =>
      produce(contents, (draft) => {
        draft.videos[index].title = title;
      })
    );
  }
  function onDeleteVideo(index: number) {
    setContents((contents) =>
      produce(contents, (draft) => {
        draft.videos.splice(index, 1);
      })
    );
  }
  function onEditTitle(title: string) {
    setContents((contents) =>
      produce(contents, (draft) => {
        draft.title = title;
      })
    );
  }
  return (
    <EditContents
      contents={contents}
      onEditTitle={onEditTitle}
      onVideoDragEnd={onVideoDragEnd}
      onEditVideo={onEditVideo}
      onDeleteVideo={onDeleteVideo}
    />
  );
};

export const Empty = () => (
  <EditContents
    contents={{
      id: 42,
      title: "",
      videos: [],
      state: "success",
    }}
    onEditTitle={() => {}}
    onVideoDragEnd={() => {}}
    onEditVideo={() => {}}
    onDeleteVideo={() => {}}
  />
);
