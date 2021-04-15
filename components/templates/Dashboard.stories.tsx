export default { title: "templates/Dashboard" };

import Dashboard from "./Dashboard";
import { session, bookLearningActivity, learnerActivity } from "$samples";

const handlers = {
  onBookLearningActivityDownload: console.log,
  onBookLearningActivityClick: console.log,
};

export const Default = () => (
  <Dashboard
    session={session}
    bookLearningActivities={[...Array(10)].map(() => bookLearningActivity)}
    learnerActivities={[...Array(10)].map(() => learnerActivity)}
    {...handlers}
  />
);

export const Empty = () => (
  <Dashboard
    session={session}
    bookLearningActivities={[]}
    learnerActivities={[]}
    {...handlers}
  />
);
