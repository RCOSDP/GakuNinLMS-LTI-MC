import { Video } from "./video";

export function ShowVideo(props: Video) {
  return <pre>{JSON.stringify(props, null, 2) /* Debug */}</pre>;
}
