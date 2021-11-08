import useSWR from "swr";
import { api } from "$utils/api";
import type { ResourceSchema } from "$server/models/resource";
import type { OembedSchema } from "$server/models/oembed";

const key = "/api/v2/resource/{resource_id}/oembed";

export default function useOembed(resourceId: ResourceSchema["id"]) {
  const { data } = useSWR<OembedSchema>([key, resourceId], async () => {
    const res = await api.apiV2ResourceResourceIdOembedGet({ resourceId });
    return res as OembedSchema;
  });
  return data;
}
