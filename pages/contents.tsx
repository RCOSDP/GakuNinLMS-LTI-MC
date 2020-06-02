import { useContentsIndex } from "components/contents";
import { ContentsTable } from "components/ContentsTable";
import { NewContents } from "components/NewContents";
import { ShowContents } from "components/ShowContents";
import { EditContents } from "components/EditContents";
import { useRouter } from "components/router";
import { useAppTitle } from "components/state";
import { useContents } from "components/contents";
import { useVideos } from "components/video";

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
  const videos = useVideos();
  return <EditContents contents={contents} videos={videos} />;
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
