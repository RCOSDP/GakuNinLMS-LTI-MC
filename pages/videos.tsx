import { useVideos, useVideo } from "components/video";
import { useAppTitle } from "components/state";
import { useRouter } from "components/router";
import { useLmsInstructor } from "components/session";
import { VideosTable } from "components/VideosTable";
import { ShowVideo } from "components/ShowVideo";
import { EditVideo } from "components/EditVideo";
import { NewVideo } from "components/NewVideo";

type Query = { id?: string; action?: "edit" | "new" };

function Index() {
  const videos = useVideos();
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

function Show(props: { id: string }) {
  const video = useVideo(Number(props.id));
  return <ShowVideo {...video} />;
}
function Edit(props: { id: string }) {
  const video = useVideo(Number(props.id));
  return <EditVideo video={video} />;
}
function New() {
  const video = useVideo();
  return <NewVideo video={video} />;
}

function Router() {
  useLmsInstructor();
  const router = useRouter();
  const query: Query = router.query;

  useAppTitle()("ビデオ管理");

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
