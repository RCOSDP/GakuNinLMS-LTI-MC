export default { title: "VideosTable" };
import { VideosTable } from "./VideosTable";
import { Videos } from "./video";

const props: Videos = {
  videos: [2, 4, 6, 8].map((id) => ({
    id,
    title: `Sample Video ${id}`,
    description: `Sample Description ${id}`,
    creator: `user${id}`,
  })),
  state: "success",
};

export function Basic() {
  return <VideosTable {...props} />;
}
