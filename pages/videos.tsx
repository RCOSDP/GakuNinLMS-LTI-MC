import { useVideos } from "components/video";
import { useAppTitle } from "components/state";
import { VideosTable } from "components/VideosTable";
import { ShowVideo } from "components/ShowVideo";
import { useRouter } from "components/router";
import { ShowSession } from "components/ShowSession";

type Query = { id?: string; action?: "edit" | "new" };

function Index() {
  const videos = useVideos();
  useAppTitle()("ビデオ管理");
  switch (videos.state) {
    case "failure":
      return <div>failed to load</div>;
    case "pending":
      return <div>loading...</div>;
  }
  return (
    <div>
      <VideosTable {...videos} />
    </div>
  );
}

const Show = ShowVideo;
const Edit = ShowVideo;
const New = ShowSession;

function Router() {
  const router = useRouter();
  const query: Query = router.query;

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
