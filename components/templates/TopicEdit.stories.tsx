export default { title: "templates/TopicEdit" };

import TopicEdit from "./TopicEdit";
import { topic } from "samples";

const props = {
  topic,
  onSubmit: console.log,
  onSubtitleDelete: console.log,
  onSubtitleSubmit: console.log,
};

export const Default = () => <TopicEdit {...props} />;

export const Empty = () => <TopicEdit {...{ ...props, topic: null }} />;
