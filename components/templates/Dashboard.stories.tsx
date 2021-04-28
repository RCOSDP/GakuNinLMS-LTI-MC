export default { title: "templates/Dashboard" };

import Dashboard from "./Dashboard";
import { session, bookActivity, book } from "$samples";

const han = (n: number) =>
  new Intl.NumberFormat("ja-JP-u-nu-hanidec").format(n);
const learner = (id: number) => ({ id, name: `山田 ${han(id)}太郎` });

export const Default = () => (
  <Dashboard
    session={session}
    learners={[...Array(50)].map((_, id) => learner(id))}
    courseBooks={[...Array(10)].map((_, id) => ({ ...book, id }))}
    bookActivities={[...Array(1500)].map((_, i) => ({
      ...bookActivity,
      learner: learner(i % 50),
      book: { ...bookActivity.book, id: Math.floor(Math.random() * 10) },
      topic: { ...bookActivity.topic, id: (i % 3) + 1 },
    }))}
  />
);
