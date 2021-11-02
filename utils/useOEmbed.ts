import useSWR from "swr";
import type { ResourceSchema } from "$server/models/resource";
import providers from "$utils/providers";

const oembed: { [key: string]: string } = {
  youtube: "https://www.youtube.com/oembed?url=",
  vimeo: "https://vimeo.com/oembed.json?url=",
} as const;

async function fetcher(url: string): Promise<boolean | null> {
  const response = await fetch(url);
  return response.json();
}

export default function useOEmbed(resource: ResourceSchema) {
  const [provider = ""] =
    Object.entries(providers).find(([, { baseUrl }]) =>
      resource.url.startsWith(baseUrl)
    ) ?? [];
  const { data } = useSWR(
    provider ? oembed[provider] + resource.url : null,
    fetcher
  );
  return data as { thumbnail_url: string } | undefined;
}
