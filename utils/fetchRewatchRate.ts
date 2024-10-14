import { api } from "./api";

export async function fetchRewatchRate(currentLtiContextOnly: boolean) {
  const res = await api.apiV2ActivityRewatchRateGet({
    currentLtiContextOnly: currentLtiContextOnly,
  });
  return res;
}

export default fetchRewatchRate;
