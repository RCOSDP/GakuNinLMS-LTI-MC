import {
  useContentsIndex,
  updateContents,
  Contents,
} from "components/contents";
import { ContentsTable } from "components/ContentsTable";
import { NewContents } from "components/NewContents";
import { ShowContents } from "components/ShowContents";
import { EditContents } from "components/EditContents";
import { useRouter } from "components/router";
import { useAppTitle } from "components/state";
import { useContents } from "components/contents";
import { reorder } from "components/reorder";
import { produce } from "immer";
import { useCallback } from "react";

type Query = { id?: string; action?: "edit" | "new" };

function Index() {
  const contentsIndex = useContentsIndex();

  switch (contentsIndex.state) {
    case "failure":
      return <div>failed to load</div>;
    case "pending":
      return <div>loading...</div>;
  }

  return (
    <div>
      <ContentsTable {...contentsIndex} />
    </div>
  );
}

function Show(props: { id: string }) {
  const contents = useContents(Number(props.id));
  return <ShowContents {...contents} />;
}
function Edit(props: { id: string }) {
  const contents = useContents(Number(props.id));
  const onVideoDragEnd = useCallback(
    (source: number, destination: number) => {
      if (contents.id == null) return;
      updateContents(
        produce(contents, (draft) => {
          draft.videos = reorder(draft.videos, source, destination);
        }) as Required<Contents>
      );
    },
    [contents]
  );
  const onEditVideo = useCallback(
    (index: number, title: string) => {
      if (contents.id == null) return;
      updateContents(
        produce(contents, (draft) => {
          draft.videos[index].title = title;
        }) as Required<Contents>
      );
    },
    [contents]
  );
  const onDeleteVideo = useCallback(
    (index: number) => {
      if (contents.id == null) return;
      updateContents(
        produce(contents, (draft) => {
          draft.videos.splice(index, 1);
        }) as Required<Contents>
      );
    },
    [contents]
  );
  const onEditTitle = useCallback(
    (title: string) => {
      if (contents.id == null) return;
      updateContents(
        produce(contents, (draft) => {
          draft.title = title;
        }) as Required<Contents>
      );
    },
    [contents]
  );

  return (
    <EditContents
      contents={contents}
      onEditTitle={onEditTitle}
      onVideoDragEnd={onVideoDragEnd}
      onEditVideo={onEditVideo}
      onDeleteVideo={onDeleteVideo}
    />
  );
}
function New() {
  const contents = useContents();
  return <NewContents {...contents} />;
}

function Router() {
  const router = useRouter();
  const query: Query = router.query;

  useAppTitle()("学習コンテンツ管理");

  if (!query.id) {
    switch (query.action) {
      default:
        return <Index />;
      case "new":
        return <New />;
    }
  }

  switch (query.action) {
    default:
      return <Show id={query.id} />;
    case "edit":
      return <Edit id={query.id} />;
  }
}

export default Router;
