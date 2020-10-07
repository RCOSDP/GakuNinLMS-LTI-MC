import {
  fetchJson,
  postFormFetchJson,
  postFormFetchText,
  postJsonFetchText,
  useApi,
} from "./api";
import { createSubtitles } from "./video/subtitle";
import { mutate } from "swr";

const key = "/api/video";
const basePath = process.env.NEXT_PUBLIC_API_BASE_PATH ?? "";

const initialVideos: Videos = {
  videos: [],
  state: "pending",
};
async function fetchVideos(_: typeof key) {
  const url = `${basePath}/call/microcontent_search.php`;
  return fetchJson(url).then(videosHandler);
}
type VideosResponse = {
  contents: Array<{
    id: string;
    name: string;
    description: string;
    createdby: string;
  }>;
};
function videosHandler(res: VideosResponse): VideosSchema {
  return {
    videos: res.contents.map(({ id, name, description, createdby }) => ({
      id: Number(id),
      title: name,
      description,
      creator: createdby,
    })),
  };
}
export const useVideos = () => useApi(key, fetchVideos, initialVideos);

const initialVideo: Video = {
  id: NaN,
  title: "",
  description: "",
  type: "wowza",
  src: "",
  creator: "",
  skills: [],
  tasks: [],
  levels: [],
  subtitles: [],
  state: "pending",
};
async function fetchVideo(_: typeof key, id: VideoSchema["id"]) {
  if (!Number.isFinite(id)) return await fetchInitialVideo();
  const url = `${basePath}/call/microcontent_edit.php`;
  const req: ShowVideoRequest = {
    microcontent_id: id.toString(),
  };
  const res = await postFormFetchJson(url, req).then(showHandler(id));
  return res;
}
async function fetchInitialVideo() {
  const url = `${basePath}/call/microcontent_new.php`;
  const res = await fetchJson(url).then(initialVideoHandler);
  return res;
}
function showHandler(
  videoId: Video["id"]
): (res: ShowVideoResponse) => VideoSchema {
  return (res) => ({
    id: videoId,
    title: res.title,
    description: res.description,
    type: res.type,
    src: res.src,
    creator: res.createdby,
    skills: res.skills.map(({ id, name, checked }) => ({
      id: Number(id),
      name,
      has: checked === "checked",
    })),
    tasks: res.tasks.map(({ id, name, checked }) => ({
      id: Number(id),
      name,
      has: checked === "checked",
    })),
    levels: res.levels.map(({ id, name, checked }) => ({
      id: Number(id),
      name,
      has: checked === "checked",
    })),
    subtitles: res.subtitles.map(({ id, cname }) => ({
      id: Number(id),
      lang: cname,
      file: new File([], `${videoId}_${cname}.vtt`),
    })),
  });
}
function initialVideoHandler(res: InitialVideoResponse): VideoSchema {
  return {
    ...initialVideo,
    skills: res.skills.map(({ id, name }) => ({
      id: Number(id),
      name,
      has: false,
    })),
    tasks: res.tasks.map(({ id, name }) => ({
      id: Number(id),
      name,
      has: false,
    })),
    levels: res.levels.map(({ id, name }) => ({
      id: Number(id),
      name,
      has: false,
    })),
  };
}
type ShowVideoRequest = {
  microcontent_id: string;
};
type ShowVideoResponse = {
  title: string;
  type: VideoSchema["type"];
  src: VideoSchema["src"];
  description: string;
  createdby: string;
  subtitles: Array<{ id: string; cname: string }>; // NOTE: `{id}_{cname}.vtt` cname as langcode
  skills: Array<{ id: string; name: string; checked: "" | "checked" }>;
  tasks: Array<{ id: string; name: string; checked: "" | "checked" }>;
  levels: Array<{ id: string; name: string; checked: "" | "checked" }>;
};
type InitialVideoResponse = {
  skills: Array<{ id: string; name: string }>;
  tasks: Array<{ id: string; name: string }>;
  levels: Array<{ id: string; name: string }>;
};
export const useVideo = (id: VideoSchema["id"]) =>
  useApi([key, id], fetchVideo, initialVideo);

export async function create(video: VideoSchema): Promise<VideoSchema["id"]> {
  const url = `${basePath}/call/microcontent_create.php`;
  const req: CreateRequest = {
    title: video.title,
    type: video.type,
    src: video.src,
    description: video.description,
    subtitles: video.subtitles,
    skill: video.skills.flatMap(({ id, has }) => (has ? [id.toString()] : [])),
    task: video.tasks.flatMap(({ id, has }) => (has ? [id.toString()] : [])),
    level: video.levels.flatMap(({ id, has }) => (has ? [id.toString()] : [])),
  };
  let id: VideoSchema["id"] = NaN;
  try {
    id = Number(await postJsonFetchText(url, req));
  } catch {}
  if (!Number.isFinite(id)) {
    await failure(video.id);
    return NaN;
  }

  try {
    await createSubtitles(id, video.subtitles);
    await success({ ...video, id });
    return id;
  } catch {
    await failure(video.id);
    return NaN;
  }
}
type CreateRequest = {
  title: string;
  type: VideoSchema["type"];
  src: VideoSchema["src"];
  description: string;
  subtitles: Subtitle[];
  skill: string[];
  task: string[];
  level: string[];
};

async function update(video: VideoSchema) {
  const url = `${basePath}/call/microcontent_update.php`;
  const req: UpdateRequest = {
    id: video.id,
    title: video.title,
    type: video.type,
    src: video.src,
    description: video.description,
    subtitles: video.subtitles,
    skill: video.skills.flatMap(({ id, has }) => (has ? [id.toString()] : [])),
    task: video.tasks.flatMap(({ id, has }) => (has ? [id.toString()] : [])),
    level: video.levels.flatMap(({ id, has }) => (has ? [id.toString()] : [])),
  };
  let id: VideoSchema["id"] = NaN;
  try {
    id = Number(await postJsonFetchText(url, req));
  } catch {}
  if (!Number.isFinite(id)) {
    return await failure(video.id);
  }

  try {
    await createSubtitles(id, video.subtitles);
    await success({ ...video, id });
  } catch {
    await failure(video.id);
  }
}
type UpdateRequest = {
  id: number;
} & CreateRequest;

export async function destroyVideo(id: VideoSchema["id"]) {
  if (!Number.isFinite(id)) {
    return await failure(id);
  }
  const url = `${basePath}/call/microcontent_delete.php`;
  const req: DestroyVideoRequest = {
    microcontentid: id.toString(),
  };
  try {
    await postFormFetchText(url, req);
    await success({ ...initialVideo, id });
  } catch {
    await failure(id);
  }
}
type DestroyVideoRequest = {
  microcontentid: string;
};

export async function saveVideo(video: VideoSchema) {
  let id: VideoSchema["id"] = video.id;
  if (Number.isFinite(id)) {
    await update(video);
  } else {
    id = await create(video);
  }
  return id;
}

async function success(video: VideoSchema) {
  await mutate([key, video.id], (prev?: Video) => ({
    ...(prev || initialVideo),
    ...video,
    state: "success",
  }));
  await mutate(key);
}

async function failure(id: VideoSchema["id"]) {
  await mutate([key, id], (prev?: Video) => ({
    ...(prev || initialVideo),
    state: "failure",
  }));
  await mutate(key);
}