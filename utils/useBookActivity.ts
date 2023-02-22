import useSWR from "swr";
import type { BookSchema } from "$server/models/book";
import { api } from "./api";
import type { ActivitySchema } from "$server/models/activity";
import { useSessionAtom } from "$store/session";
import { useActivityAtom } from "$store/activity";
import { isInstructor } from "./session";
import {
  NEXT_PUBLIC_ACTIVITY_LTI_CONTEXT_ONLY,
  NEXT_PUBLIC_ACTIVITY_SEND_INTERVAL,
} from "./env";

const key = "/api/v2/book/{book_id}/activity";
const initialActivity: [] = [];

async function updateBookActivity(_: typeof key, bookId: BookSchema["id"]) {
  if (!bookId) return;
  const res = await api.apiV2BookBookIdActivityPut({
    bookId,
    currentLtiContextOnly: NEXT_PUBLIC_ACTIVITY_LTI_CONTEXT_ONLY,
  });
  return res.activity as Array<ActivitySchema>;
}

function useBookActivity(bookId: BookSchema["id"] | undefined) {
  const { session } = useSessionAtom();
  const isLeaner = session?.user?.id && !isInstructor(session);
  const { data = initialActivity } = useSWR(
    isLeaner && Number.isFinite(bookId) ? [key, bookId] : null,
    updateBookActivity,
    { refreshInterval: NEXT_PUBLIC_ACTIVITY_SEND_INTERVAL * 1_000 }
  );
  useActivityAtom(data);

  return { data };
}

export default useBookActivity;
