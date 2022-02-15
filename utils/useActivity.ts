import useSWR from "swr";
import type { LearnerSchema } from "$server/models/learner";
import type { CourseBookSchema } from "$server/models/courseBook";
import type { BookActivitySchema } from "$server/models/bookActivity";
import { api } from "./api";
import { NEXT_PUBLIC_ACTIVITY_LTI_CONTEXT_ONLY } from "./env";

const key = "/api/v2/activity";

async function fetchActivity() {
  const res = await api.apiV2ActivityGet({
    currentLtiContextOnly: NEXT_PUBLIC_ACTIVITY_LTI_CONTEXT_ONLY,
  });
  const learners = res["learners"] as Array<LearnerSchema>;
  const courseBooks = res["courseBooks"] as Array<CourseBookSchema>;
  const bookActivities = res["bookActivities"] as Array<BookActivitySchema>;

  return { learners, courseBooks, bookActivities };
}

function useActivity() {
  const { data, error } = useSWR(key, fetchActivity);
  return { data, error };
}

export default useActivity;
