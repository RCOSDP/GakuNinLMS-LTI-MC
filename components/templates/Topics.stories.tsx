export default { title: "templates/Topics" };

import Topics from "./Topics";
import { Default as AppBar } from "$organisms/AppBar.stories";
import { topic } from "samples";

const topics = [...Array(10)].map(() => topic);
const handlers = {
  onTopicEditClick: console.log,
};

export const Default = () => (
  <>
    <AppBar />
    <Topics topics={topics} {...handlers} />
  </>
);

export const Empty = () => (
  <>
    <AppBar />
    <Topics topics={[]} {...handlers} />
  </>
);
