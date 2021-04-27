import useSWR from "swr";
import { BookSchema } from "$server/models/book";
import { api } from "./api";
import { ActivitySchema } from "$server/models/activity";
import { useActivityAtom } from "$store/activity";
import { NEXT_PUBLIC_ACTIVITY_SEND_INTERVAL } from "./env";

const key = "/api/v2/book/{book_id}/activity";

async function fetchBookActivity(_: typeof key, bookId: BookSchema["id"]) {
  const res = await api.apiV2BookBookIdActivityGet({ bookId });
  return res.activity as Array<ActivitySchema>;
}

function useBookActivity(bookId: BookSchema["id"]) {
  const { data } = useSWR([key, bookId], fetchBookActivity, {
    refreshInterval: NEXT_PUBLIC_ACTIVITY_SEND_INTERVAL * 1_000,
  });
  useActivityAtom(data ?? []);
}

export default useBookActivity;
