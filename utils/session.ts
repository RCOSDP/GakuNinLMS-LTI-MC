import useSWR from "swr";
import { SessionScheme } from "$server/models/session";
import { InlineResponse2003ToJSON } from "$openapi/models";
import { api } from "./api";

export function useSession() {
  return useSWR<SessionScheme>("/api/v2/session", async () => {
    const body = await api.apiV2SessionGet();
    return InlineResponse2003ToJSON(body);
  });
}
