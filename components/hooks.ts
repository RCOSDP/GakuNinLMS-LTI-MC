import useSWR, { mutate } from "swr";
import { useSnackbar } from "material-ui-snackbar-provider";
import { useAppVideos } from "./state";

const basePath = process.env.NEXT_PUBLIC_API_BASE_PATH || "";
const sessionPath = `${basePath}/call/session.php`;
const videosPath = `${basePath}/call/microcontent_search.php`;
const registContentsPath = `${basePath}/call/content_regist.php`;

type SessionResponse = {
  id: string;
  role: "administrator" | "instructor" | "";
};

type VideosResponse = {
  contents: ReadonlyArray<{ id: string; name: string; description: string }>;
};

export function jsonFetcher(input: RequestInfo, init?: RequestInit) {
  return fetch(input, init).then((r) => r.json());
}

export function textFetcher(input: RequestInfo, init?: RequestInit) {
  return fetch(input, init).then((r) => r.text());
}

export const postForm = <T extends Function>(fetcher: T) => <U extends object>(
  url: string,
  params: U,
  init?: RequestInit
) => {
  const form = new FormData();
  Object.entries(params).forEach(([key, value]) => form.append(key, value));

  return fetcher(url, {
    method: "POST",
    body: form,
    ...init,
  });
};

export const postJson = <T extends Function>(fetcher: T) => <U extends object>(
  url: string,
  params: U,
  init?: RequestInit
) => {
  return fetcher(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    body: JSON.stringify(params),
    ...init,
  });
};

type LinkedContentsResponse = {
  id: string;
  name: string;
};

export function registContents(id: string, name: string) {
  mutate(registContentsPath, async () => {
    const data = await postForm(textFetcher)(registContentsPath, {
      content_id: id,
    });
    if (data !== "new" && data !== "update") throw new Error(data);
    const res: LinkedContentsResponse = { id, name };
    return res;
  });
}

export function useShowRegistContents() {
  const { showMessage } = useSnackbar();
  const { data, error } = useSWR<LinkedContentsResponse>(registContentsPath);

  if (error) {
    console.error(error);
    showMessage("問題が発生しました。");
  } else if (data) {
    showMessage(`「${data.name}」を紐づけました`);
    mutate(registContentsPath, () => null);
  }

  return { data, error };
}

function useJsonFetcher<T>(url: string, init?: RequestInit, config?: any) {
  return useSWR<T>(
    [url, init],
    init ? (url: any) => jsonFetcher(url, init) : jsonFetcher,
    config
  );
}

export const useSession = () => useJsonFetcher<SessionResponse>(sessionPath);
export const useVideos = () => {
  const res = useJsonFetcher<VideosResponse>(videosPath);
  const setVideos = useAppVideos();
  if (!res.error && res.data) setVideos(res.data.contents.map(({ id }) => id));
  return res;
};
