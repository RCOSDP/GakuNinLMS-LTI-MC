import useSWR from "swr";
import { api } from "./api";
import { UserSchema } from "$server/models/user";
import { UserBooksSchema } from "$server/models/userBooks";

const key = "/api/v2/user/{user_id}/books";

async function fetchUserBooks(_: typeof key, userId: UserSchema["id"]) {
  const res = await api.apiV2UserUserIdBooksGet({ userId });
  return res as UserBooksSchema;
}

export function useUserBooks(userId: UserSchema["id"]) {
  return useSWR<UserBooksSchema>([key, userId], fetchUserBooks);
}
