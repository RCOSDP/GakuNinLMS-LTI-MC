export default { title: "templates/Dashboard" };

import Dashboard from "./Dashboard";
import { session, user, bookActivity, book } from "$samples";

const handlers = {
  onActivitiesDownload: console.log,
};

export const Default = () => (
  <Dashboard
    session={session}
    learners={[...Array(160)].map(() => user)}
    courseBooks={[...Array(10)].map((_, id) => ({ ...book, id }))}
    bookActivities={[...Array(100)].map((_, i) => ({
      ...bookActivity,
      book: { ...bookActivity.book, id: i % 10 },
    }))}
    {...handlers}
  />
);
