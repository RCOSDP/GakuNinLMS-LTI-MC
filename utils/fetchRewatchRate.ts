import { api } from "./api";

export async function fetchRewatchRate() {
  const res = await api.apiV2ActivityRewatchRateGet();
  return res;
}

export default fetchRewatchRate;
