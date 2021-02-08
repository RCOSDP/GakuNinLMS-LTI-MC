export default { title: "templates/Topics" };

import Topics from "./Topics";
import AppBar from "$organisms/AppBar";
import { topic, session } from "samples";

const appBarHandlers = {
  onBooksClick: console.log,
  onTopicsClick: console.log,
  onDashboardClick: console.log,
};

const topics = [...Array(10)].map(() => topic);

const handlers = {
  onTopicEditClick: console.log,
};

export const Default = () => (
  <>
    <AppBar position="sticky" session={session} {...appBarHandlers} />
    <Topics topics={topics} {...handlers} />
  </>
);

export const Empty = () => (
  <>
    <AppBar position="sticky" session={session} {...appBarHandlers} />
    <Topics topics={[]} {...handlers} />
  </>
);
