export default { title: "templates/TopicImport" };

import TopicImport from "./TopicImport";
import { Default as AppBar } from "$organisms/AppBar.stories";
import { topic } from "samples";

const topics = [...Array(10)].map(() => topic);
const handlers = {
  onSubmit: console.log,
  onCancel: () => console.log("Cancel"),
  onTopicEditClick: console.log,
  isTopicEditable: () => true,
};

export const Default = () => (
  <>
    <AppBar />
    <TopicImport topics={topics} {...handlers} />
  </>
);

export const Empty = () => (
  <>
    <AppBar />
    <TopicImport topics={[]} {...handlers} />
  </>
);

export const Others = () => (
  <>
    <AppBar />
    <TopicImport topics={topics} {...handlers} isTopicEditable={() => false} />
  </>
);
