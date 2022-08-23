import useSWR, { mutate } from "swr";
import { api } from "./api";
import type {
  LtiResourceLinkProps,
  LtiResourceLinkSchema,
} from "$server/models/ltiResourceLink";
import { revalidateSession } from "./session";

const key =
  "/api/v2/lti/{lti_consumer_id}/resource_link/{lti_resource_link_id}";

async function fetchLtiResourceLink(
  _: typeof key,
  consumerId: LtiResourceLinkSchema["consumerId"],
  id: LtiResourceLinkSchema["id"]
) {
  const res = await api.apiV2LtiLtiConsumerIdResourceLinkLtiResourceLinkIdGet({
    ltiConsumerId: consumerId,
    ltiResourceLinkId: id,
  });
  await revalidateSession();
  return res as LtiResourceLinkSchema;
}

export function useLtiResourceLink({
  consumerId,
  id,
}: Pick<LtiResourceLinkSchema, "consumerId" | "id">) {
  return useSWR<LtiResourceLinkSchema>(
    [key, consumerId, id],
    fetchLtiResourceLink
  );
}

export async function updateLtiResourceLink({
  consumerId,
  id,
  ...body
}: Pick<LtiResourceLinkSchema, "consumerId" | "id"> & LtiResourceLinkProps) {
  const res = await api.apiV2LtiLtiConsumerIdResourceLinkLtiResourceLinkIdPut({
    ltiConsumerId: consumerId,
    ltiResourceLinkId: id,
    body,
  });
  await mutate([key, consumerId, id], res);
  await revalidateSession();
}

export async function destroyLtiResourceLink({
  consumerId,
  id,
}: Pick<LtiResourceLinkSchema, "consumerId" | "id">) {
  await api.apiV2LtiLtiConsumerIdResourceLinkLtiResourceLinkIdDeleteRaw({
    ltiConsumerId: consumerId,
    ltiResourceLinkId: id,
  });
  await revalidateSession();
}
