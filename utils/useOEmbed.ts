import useSWR from "swr";
import type { ResourceSchema } from "$server/models/resource";
import resourceToOEmbedProvider from "$utils/resourceToOEmbedProvider";

async function fetcher<T>(url: string): Promise<T> {
  const response = await fetch(url);
  return response.json();
}

export default function useOEmbed<T>(resource: ResourceSchema) {
  const provider = resourceToOEmbedProvider(resource);
  const params = new URLSearchParams();
  params.append("url", resource.url);
  const { data } = useSWR<T>(
    provider ? provider + "?" + params.toString() : null,
    fetcher
  );
  return data;
}
