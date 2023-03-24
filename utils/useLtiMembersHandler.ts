import type { LtiNrpsContextMemberSchema } from "$server/models/ltiNrpsContextMember";
import { useCallback } from "react";
import { mutate } from "swr";
import { api } from "./api";

const key = "/api/v2/lti/members";

export async function updateLtiMembers({
  members,
  currentLtiContextOnly,
}: {
  members: LtiNrpsContextMemberSchema[];
  currentLtiContextOnly: boolean;
}) {
  await api.apiV2LtiMembersPut({
    body: { members },
  });
  await mutate(["/api/v2/activity", currentLtiContextOnly]);
  return await mutate(key);
}

function useLtiMembersHandler() {
  const handler = useCallback(
    async ({
      members,
      currentLtiContextOnly,
    }: {
      members: LtiNrpsContextMemberSchema[];
      currentLtiContextOnly: boolean;
    }) => {
      return await updateLtiMembers({ members, currentLtiContextOnly });
    },
    []
  );
  return handler;
}

export default useLtiMembersHandler;
