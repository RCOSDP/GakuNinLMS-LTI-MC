import useSWR from "swr";
import { api } from "$utils/api";

const key = "/api/v2/lti/clients";

async function fetchClients(_: typeof key): Promise<string[]> {
  const { oauthClients } = await api.apiV2LtiClientsGet();
  return oauthClients as string[];
}

const initialData: string[] = [];

function useClientIds() {
  const { data } = useSWR(key, fetchClients);
  return data ?? initialData;
}

export default useClientIds;
