import { api } from "./api";

export async function updateLtiMember() {
  await api.apiV2LtiMemberPut();
}
