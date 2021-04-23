import useSWR from "swr";
import { LearnerSchema } from "$server/models/learner";
import { CourseBookSchema } from "$server/models/courseBook";
import { BookActivitySchema } from "$server/models/bookActivity";
import { api } from "./api";

const key = "/api/v2/activity";

async function fetchActivity() {
  const res = await api.apiV2ActivityGet();
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
