import useSWR from "swr";
import { useRouter as useNextRouter } from "next/router";
import { validUrl } from "./url";
import { UrlObject, format } from "url";
import * as config from "next.config.js";

const basePath = process.env.NEXT_PUBLIC_API_BASE_PATH || "";
const sessionPath = `${basePath}/call/session.php`;
const contentsPath = `${basePath}/call/content_list_view.php`;
const videosPath = `${basePath}/call/microcontent_search.php`;

type SessionResponse = {
  id: string;
  role: "administrator" | "instructor" | "";
};

type ContentsResponse = ReadonlyArray<{
  id: string;
  name: string;
  timemodified: string;
  createdby: string;
}>;

type VideosResponse = {
  contents: ReadonlyArray<{ id: string; name: string; description: string }>;
};

function jsonFetcher(url: string, init?: RequestInit) {
  return fetch(url, init).then((r) => r.json());
}

function useJsonFetcher<T>(url: string, init?: RequestInit) {
  return useSWR<T>(
    url,
    init ? (url: any) => jsonFetcher(url, init) : jsonFetcher
  );
}

export const useSession = () => useJsonFetcher<SessionResponse>(sessionPath);

export const useContents = () => useJsonFetcher<ContentsResponse>(contentsPath);

export const useVideos = () => useJsonFetcher<VideosResponse>(videosPath);

export function useRouter() {
  const router = useNextRouter();
  const originalPush = router.push;
  function push(urlOrPath: string | UrlObject) {
    const url =
      validUrl(urlOrPath)?.href ??
      (typeof urlOrPath === "string"
        ? `${config.experimental.basePath}${urlOrPath}.html`
        : format({
            ...urlOrPath,
            pathname: `${config.experimental.basePath}${urlOrPath.pathname}.html`,
          }));

    return originalPush(urlOrPath, url);
  }
  router.push = push;

  return router;
}
