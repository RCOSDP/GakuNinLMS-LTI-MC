import useSWR, { mutate } from "swr";
import { jsonFetcher, textFetcher, postJson, postForm } from "./hooks";

const key = "/api/contents";
type VideoId = number; // NOTE: Video.id
type Contents = {
  id?: number;
  title: string;
  videos: Array<{
    id: VideoId;
    title: string;
  }>;
};

export type ContentsWithState = Contents & {
  state: "pending" | "success" | "failure";
};

const initialData: ContentsWithState = {
  title: "",
  videos: [],
  state: "pending",
};

async function fetchTheContents(
  _: typeof key,
  id: number
): Promise<ContentsWithState> {
  if (id == null) return initialData;
  const url = `${process.env.NEXT_PUBLIC_API_BASE_PATH}/call/list_content_view.php`;
  const req: ShowContentsRequest = {
    content_id: id.toString(),
  };

  try {
    const res: ShowContentsResponse = await postForm(jsonFetcher)(url, req);
    const contents = {
      id,
      title: res.title,
      videos: res.contents.map(({ id, cname }) => ({
        id: Number(id),
        title: cname,
      })),
    };

    return {
      ...initialData,
      ...contents,
      state: "success",
    };
  } catch {
    return {
      ...initialData,
      state: "failure",
    };
  }
}

export function useContents(id?: number) {
  const { data, error } = useSWR<ContentsWithState>(
    [key, id],
    fetchTheContents
  );
  const contents = data || initialData;
  if (error) {
    const res: ContentsWithState = { ...contents, state: "failure" };
    return res;
  }
  return contents;
}

export async function showContents(id: Contents["id"]) {
  if (id == null) {
    failure(id);
    return;
  }
  mutate([key, id]);
}

export async function createContents(contents: Contents) {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_PATH}/call/content_create.php`;
  const req: CreateContentsRequest = {
    title: contents.title,
    contents: contents.videos.map(({ id, title }) => [id, title]),
  };
  try {
    const id = await postJson(textFetcher)(url, req);
    success({ ...contents, id: Number(id) });
  } catch {
    failure(contents.id);
  }
}

export async function updateContents(contents: Required<Contents>) {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_PATH}/call/content_update.php`;
  const req: UpdateContentsRequest = {
    id: contents.id,
    title: contents.title,
    contents: contents.videos.map(({ id, title }) => [id, title]),
  };
  try {
    await postJson(textFetcher)(url, req);
    success(contents);
  } catch {
    failure(contents.id);
  }
}

export async function destroyContents(id: Contents["id"]) {
  if (id == null) {
    failure(id);
    return;
  }
  const url = `${process.env.NEXT_PUBLIC_API_BASE_PATH}/call/call/content_delete.php`;
  const req: DestroyContentsRequest = {
    content_id: id.toString(),
  };
  try {
    await postForm(textFetcher)(url, req);
    success({ ...initialData, id });
  } catch {
    failure(id);
  }
}

function success(contents: Required<Contents>) {
  mutate([key, contents.id], (prev?: ContentsWithState) => ({
    ...(prev || initialData),
    ...contents,
    state: "success",
  }));
}

function failure(id: Contents["id"]) {
  mutate([key, id], (prev?: ContentsWithState) => ({
    ...(prev || initialData),
    state: "failure",
  }));
}

// // NOTE: GET /call/content_list_view.php
// type IndexContentsResponse = Array<{
//   id: string;
//   name: string;
//   timemodified: Date;
//   createdby: string;
// }>;

type CreateContentsRequest = {
  title: string;
  contents: Array<[number, string]>;
};

type ShowContentsRequest = {
  content_id: string;
};
type ShowContentsResponse = {
  title: string;
  contents: Array<{
    id: string;
    cname: string;
  }>;
};

type UpdateContentsRequest = { id: number } & CreateContentsRequest;

type DestroyContentsRequest = ShowContentsRequest;
