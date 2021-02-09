export default { title: "templates/TopicImport" };

import TopicImport from "./TopicImport";
import AppBar from "$organisms/AppBar";
import { topic, session } from "samples";

const appBarHandlers = {
  onBooksClick: console.log,
  onTopicsClick: console.log,
  onDashboardClick: console.log,
};

const topics = [...Array(10)].map(() => topic);

const handlers = {
  onSubmit: console.log,
  onCancel: () => console.log("Cancel"),
  onTopicEditClick: console.log,
  isTopicEditable: () => true,
};

export const Default = () => (
  <>
    <AppBar position="sticky" session={session} {...appBarHandlers} />
    <TopicImport topics={topics} {...handlers} />
  </>
);

export const Empty = () => (
  <>
    <AppBar position="sticky" session={session} {...appBarHandlers} />
    <TopicImport topics={[]} {...handlers} />
  </>
);

export const Others = () => (
  <>
    <AppBar position="sticky" session={session} {...appBarHandlers} />
    <TopicImport topics={topics} {...handlers} isTopicEditable={() => false} />
  </>
);
