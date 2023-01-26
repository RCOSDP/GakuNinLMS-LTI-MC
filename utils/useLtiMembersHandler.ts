import type { LtiNrpsContextMemberSchema } from "$server/models/ltiNrpsContextMember";
import { useCallback } from "react";
import { mutate } from "swr";
import { api } from "./api";

const key = "/api/v2/lti/members";

export async function updateLtiMembers({
  members,
}: {
  members: LtiNrpsContextMemberSchema[];
}) {
  const res = await api.apiV2LtiMembersPut({
    body: { members },
  });
  return await mutate(key, res);
}

function useLtiMembersHandler() {
  const handler = useCallback(
    async ({ members }: { members: LtiNrpsContextMemberSchema[] }) => {
      return await updateLtiMembers({ members });
    },
    []
  );
  return handler;
}

export default useLtiMembersHandler;
