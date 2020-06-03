import {
  jsonFetcher,
  WithState,
  useApi,
  makeFetcher,
  postForm,
  textFetcher,
  postJson,
} from "./api";
import { Skill } from "./video/skill";
import { Task } from "./video/task";
import { Level } from "./video/level";
import { Subtitle } from "./video/subtitle";
import { mutate } from "swr";

const key = "/api/video";

type YouTubeVideoId = string;
type VideoSchema = {
  id?: number;
  title: string;
  description: string;
  youtubeVideoId: YouTubeVideoId;
  skills: Skill[];
  tasks: Task[];
  levels: Level[];
  subtitles: Subtitle[];
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

const initialVideo: Video = {
  title: "",
  description: "",
  youtubeVideoId: "",
  skills: [],
  tasks: [],
  levels: [],
  subtitles: [],
  state: "pending",
};
const fetchVideo = makeFetcher(async (_: typeof key, id: number) => {
  if (id == null) return initialVideo;
  const url = `${process.env.NEXT_PUBLIC_API_BASE_PATH}/call/microcontent_edit.php`;
  const req: ShowVideoRequest = {
    microcontent_id: id.toString(),
  };
  const video: VideoSchema = await jsonFetcher(url, postForm(req)).then(
    showVideoHandler
  );
  return {
    id,
    ...video,
  };
}, initialVideo);
function showVideoHandler(res: ShowVideoResponse): VideoSchema {
  return {
    title: res.title,
    description: res.description,
    youtubeVideoId: res.video,
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
      filename: `${id}_${cname}.vtt`,
      lang: cname,
    })),
  };
}
type ShowVideoRequest = {
  microcontent_id: string;
};
type ShowVideoResponse = {
  title: string;
  video: YouTubeVideoId;
  description: string;
  subtitles: Array<{ id: string; cname: string }>; // NOTE: `{id}_{cname}.vtt` cname as langcode
  skills: Array<{ id: string; name: string; checked: "" | "checked" }>;
  tasks: Array<{ id: string; name: string; checked: "" | "checked" }>;
  levels: Array<{ id: string; name: string; checked: "" | "checked" }>;
};
export const useVideo = (id?: number) =>
  useApi([key, id], fetchVideo, initialVideo);

export async function createVideo(video: VideoSchema, subtitles: Array<File>) {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_PATH}/call/microcontent_create.php`;
  const req: CreateVideoRequest = {
    title: video.title,
    video: video.youtubeVideoId,
    description: video.description,
    subtitles: video.subtitles,
    skill: video.skills.map(({ id }) => id.toString()),
    task: video.tasks.map(({ id }) => id.toString()),
    level: video.levels.map(({ id }) => id.toString()),
  };
  let id: VideoSchema["id"];
  try {
    id = Number(await textFetcher(url, postJson(req)));
  } catch {}
  if (!id) {
    await failure(video.id);
    return;
  }
  if (video.subtitles.length === 0) {
    await success({ ...video, id });
    return;
  }

  // NOTE: With subtitle files
  const createSubtitleUrl = `${process.env.NEXT_PUBLIC_API_BASE_PATH}/call/microcontent_subtitle.php`;
  const createSubtitles = video.subtitles.map(({ lang }, index) => {
    const req: CreateVideoSubtitleRequest = {
      id: String(id),
      lang,
      file: subtitles[index],
    };
    return textFetcher(createSubtitleUrl, postForm(req));
  });
  try {
    await Promise.all(createSubtitles);
    await success({ ...video, id });
    return;
  } catch {
    await failure(video.id);
    return;
  }
}
type CreateVideoRequest = {
  title: string;
  video: YouTubeVideoId;
  description: string;
  subtitles: Subtitle[];
  skill: string[];
  task: string[];
  level: string[];
};
type CreateVideoSubtitleRequest = {
  id: string;
  lang: string;
  file: File;
};

export async function updateVideo(
  video: Required<VideoSchema> /* TODO:, subtitles: Array<File> */
) {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_PATH}/call/microcontent_update.php`;
  const req: UpdateVideoRequest = {
    id: video.id,
    title: video.title,
    video: video.youtubeVideoId,
    description: video.description,
    subtitles: video.subtitles,
    skill: video.skills.map(({ id }) => id.toString()),
    task: video.tasks.map(({ id }) => id.toString()),
    level: video.levels.map(({ id }) => id.toString()),
  };
  let id: VideoSchema["id"];
  try {
    id = Number(await textFetcher(url, postJson(req)));
  } catch {}
  if (!id) {
    await failure(video.id);
    return;
  }
  if (video.subtitles.length === 0) {
    await success({ ...video, id });
    return;
  }

  // TODO: With subtitle files
  // POST /call/microcontent_subtitle.php
  // type UpdateVideoSubtitleRequest = CreateVideoSubtitleRequest;
}
type UpdateVideoRequest = {
  id: number;
} & CreateVideoRequest;

export async function destroyVideo(id: VideoSchema["id"]) {
  if (id == null) {
    await failure(id);
    return;
  }
  const url = `${process.env.NEXT_PUBLIC_API_BASE_PATH}/call/microcontent_delete.php`;
  const req: DestroyVideoRequest = {
    microcontentid: id.toString(),
  };
  try {
    await textFetcher(url, postForm(req));
    await success({ ...initialVideo, id });
  } catch {
    await failure(id);
  }
}
type DestroyVideoRequest = {
  microcontentid: string;
};

function success(video: Required<VideoSchema>) {
  return mutate([key, video.id], (prev?: Video) => ({
    ...(prev || initialVideo),
    ...video,
    state: "success",
  }));
}

function failure(id: VideoSchema["id"]) {
  return mutate([key, id], (prev?: Video) => ({
    ...(prev || initialVideo),
    state: "failure",
  }));
}
