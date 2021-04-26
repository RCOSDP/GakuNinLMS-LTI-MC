export default { title: "templates/Dashboard" };

import Dashboard from "./Dashboard";
import { session, user, bookActivity, book } from "$samples";

export const Default = () => (
  <Dashboard
    session={session}
    learners={[...Array(50)].map((_, id) => ({ ...user, id }))}
    courseBooks={[...Array(10)].map((_, id) => ({ ...book, id }))}
    bookActivities={[...Array(1500)].map((_, i) => ({
      ...bookActivity,
      learner: { ...bookActivity.learner, id: i % 50 },
      book: { ...bookActivity.book, id: Math.floor(Math.random() * 10) },
      topic: { ...bookActivity.topic, id: (i % 3) + 1 },
    }))}
  />
);
