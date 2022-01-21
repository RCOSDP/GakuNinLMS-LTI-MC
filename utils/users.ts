import type { UserSchema } from "$server/models/user";
import { api } from "./api";

export async function fetchUsers(email: Required<UserSchema>["email"]) {
  const res = await api.apiV2UsersEmailGet({ email });
  return res as UserSchema[];
}
