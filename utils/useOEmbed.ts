import useSWR from "swr";
import type { ResourceSchema } from "$server/models/resource";
import providers from "$utils/providers";

const oembed: { [key: string]: string } = {
  youtube: "https://www.youtube.com/oembed?url=",
  vimeo: "https://vimeo.com/oembed.json?url=",
} as const;

async function fetcher<T>(url: string): Promise<T> {
  const response = await fetch(url);
  return response.json();
}

export default function useOEmbed<T>(resource: ResourceSchema) {
  const [provider = ""] =
    Object.entries(providers).find(([, { baseUrl }]) =>
      resource.url.startsWith(baseUrl)
    ) ?? [];
  const { data } = useSWR<T>(
    provider ? oembed[provider] + resource.url : null,
    fetcher
  );
  return data;
}
