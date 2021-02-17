import { useSWRInfinite } from "swr";
import type { UserSchema } from "$server/models/user";
import type { BookSchema } from "$server/models/book";
import { api } from "./api";
import useInfiniteProps from "./useInfiniteProps";

const key = "/api/v2/user/{user_id}/books";

const makeKey = (userId: UserSchema["id"]) => (
  page: number,
  prev: BookSchema[] | null
) => {
  if (prev && prev.length === 0) return null;
  return [key, userId, page];
};

async function fetchUserBooks(
  _: typeof key,
  userId: UserSchema["id"],
  page: number
) {
  const res = await api.apiV2UserUserIdBooksGet({ userId, page });
  return res.books as BookSchema[];
}

export function useUserBooks(userId: UserSchema["id"]) {
  const { data, size, setSize } = useSWRInfinite<BookSchema[]>(
    makeKey(userId),
    fetchUserBooks
  );
  const books = data?.flatMap((books) => books) ?? [];
  return { books, ...useInfiniteProps(data, size, setSize) };
}
