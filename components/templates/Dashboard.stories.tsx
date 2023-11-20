import type { Story } from "@storybook/react";
import type { ActivityScope } from "$types/activityScope";
import { session, bookActivity, book } from "$samples";
import Dashboard from "./Dashboard";

export default {
  title: "templates/Dashboard",
  component: Dashboard,
};

const defaultScope: ActivityScope = "topic";
const han = (n: number) =>
  new Intl.NumberFormat("ja-JP-u-nu-hanidec").format(n);
const learner = (id: number) => ({
  id,
  name: `山田 ${han(id)}太郎`,
  email: `yamada${id}@example.com`,
});

const Template: Story<Parameters<typeof Dashboard>[0]> = Dashboard;

export const Default = Template.bind({});
Default.args = {
  session,
  scope: defaultScope,
  learners: [...Array(50)].map((_, id) => learner(id)),
  courseBooks: [...Array(10)].map((_, id) => ({ ...book, id })),
  bookActivities: [...Array(1500)].map((_, i) => ({
    ...bookActivity,
    learner: learner(i % 50),
    book: { ...bookActivity.book, id: Math.floor(Math.random() * 10) },
    topic: { ...bookActivity.topic, id: (i % 3) + 1 },
  })),
};
