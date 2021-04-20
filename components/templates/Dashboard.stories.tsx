export default { title: "templates/Dashboard" };

import Dashboard from "./Dashboard";
import { session, user, bookActivity, book } from "$samples";

const handlers = {
  onActivitiesDownload: console.log,
};

export const Default = () => (
  <Dashboard
    session={session}
    learners={[...Array(50)].map((_, id) => ({ ...user, id }))}
    courseBooks={[...Array(10)].map((_, id) => ({ ...book, id }))}
    bookActivities={[...Array(100)].map((_, i) => ({
      ...bookActivity,
      learner: { ...bookActivity.learner, id: i % 50 },
      book: { ...bookActivity.book, id: i % 10 },
    }))}
    {...handlers}
  />
);
