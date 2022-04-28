import useSWR from "swr";
import type { BookSchema } from "$server/models/book";
import { api } from "./api";
import type { ActivitySchema } from "$server/models/activity";
import { useActivityAtom } from "$store/activity";
import {
  NEXT_PUBLIC_ACTIVITY_LTI_CONTEXT_ONLY,
  NEXT_PUBLIC_ACTIVITY_SEND_INTERVAL,
} from "./env";

const key = "/api/v2/book/{book_id}/activity";
const initialActivity: [] = [];

async function fetchBookActivity(_: typeof key, bookId: BookSchema["id"]) {
  const res = await api.apiV2BookBookIdActivityGet({
    bookId,
    currentLtiContextOnly: NEXT_PUBLIC_ACTIVITY_LTI_CONTEXT_ONLY,
  });
  return res.activity as Array<ActivitySchema>;
}

function useBookActivity(bookId: BookSchema["id"] | undefined) {
  const { data } = useSWR(
    Number.isFinite(bookId) ? [key, bookId] : null,
    fetchBookActivity,
    { refreshInterval: NEXT_PUBLIC_ACTIVITY_SEND_INTERVAL * 1_000 }
  );
  useActivityAtom(data ?? initialActivity);
}

export default useBookActivity;
