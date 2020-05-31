import { jsonFetcher, WithState, useApi, makeFetcher } from "./api";

const key = "/api/video";

// type YouTubeWatchId = string;
type VideoSchema = {
  id?: number;
  title: string;
  description: string;
};

type VideosSchema = {
  videos: Array<{
    id: number;
    title: string;
    description: string;
  }>;
};

export type Video = WithState<VideoSchema>;
export type Videos = WithState<VideosSchema>;

const initialVideos: Videos = {
  videos: [],
  state: "pending",
};
const fetchVideos = makeFetcher(
  (_: typeof key) =>
    jsonFetcher(
      `${process.env.NEXT_PUBLIC_API_BASE_PATH}/call/microcontent_search.php`
    ).then(videosHandler),
  initialVideos
);
type VideosResponse = {
  contents: Array<{
    id: string;
    name: string;
    description: string;
  }>;
};
function videosHandler(res: VideosResponse): VideosSchema {
  return {
    videos: res.contents.map(({ id, name, description }) => ({
      id: Number(id),
      title: name,
      description,
    })),
  };
}
export const useVideos = () => useApi(key, fetchVideos, initialVideos);

// TODO:
// /** Show */
// // POST /lti/call/microcontent_edit.php
// // Form
// type ShowVideoRequest = {
//   microcontent_id: string;
// };
// type ShowVideoResponse = {
//   title: string;
//   video: YouTubeWatchId;
//   description: string;
//   subtitles: Array<{ id: string; cname: string }>; // NOTE: `{id}_{cname}.vtt`
//   skills: Array<{ id: string; name: string; checked: "" | "checked" }>;
//   tasks: Array<{ id: string; name: string; checked: "" | "checked" }>;
//   levels: Array<{ id: string; name: string; checked: "" | "checked" }>;
// };

// /** Create */
// // POST /lti/call/microcontent_create.php
// // JSON
// type CreateVideoRequest = {
//   title: string;
//   video: YouTubeWatchId;
//   description: string;
//   skill: Array<string>;
//   task: Array<string>;
//   level: Array<string>;
// };
// type CreateVideoResponse = string; // NOTE: `{id}_{lang}.vtt` (fail case: `no_subtitle`)
// // NOTE: with subtitle file
// // POST /call/microcontent_subtitle.php
// // multipart/form-data
// type CreateVideoSubtitleRequest = {
//   id: string;
//   lang: string;
//   file: File;
// };

// /** Update */
// // POST /call/microcontent_update.php
// type UpdateVideoRequest = {
//   id: number;
// } & CreateVideoRequest;
// // NOTE: with subtitle file
// // POST /call/microcontent_subtitle.php
// type UpdateVideoSubtitleRequest = CreateVideoSubtitleRequest;

// /** Destroy */
// // POST /call/microcontent_delete.php
// // Form
// type DestroyVideoRequest = {
//   microcontentid: string;
// };
