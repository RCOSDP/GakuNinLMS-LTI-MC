import useSWR from "swr";
import { api } from "./api";

const key = "/api/v2/activity";

async function fetchActivityByConsumer({
  currentLtiContextOnly,
  ltiConsumerIds,
}: {
  key: typeof key;
  currentLtiContextOnly?: boolean | undefined;
  ltiConsumerIds?: Array<string> | undefined;
}) {
  return Promise.all(
    ltiConsumerIds?.map((ltiConsumerId) =>
      api.apiV2ActivityGet({ currentLtiContextOnly, ltiConsumerId })
    ) ?? []
  );
}

/**
 * 学習活動を取得する
 * @param currentLtiContextOnly 学習活動の LTI Context ごとでの取得
 * @param ltiConsumerIds
 */
function useActivityByConsumer(
  currentLtiContextOnly?: boolean | undefined,
  ltiConsumerIds?: Array<string> | undefined
) {
  const { data, error } = useSWR(
    { key, currentLtiContextOnly, ltiConsumerIds },
    fetchActivityByConsumer
  );
  return { data, error };
}

export default useActivityByConsumer;
