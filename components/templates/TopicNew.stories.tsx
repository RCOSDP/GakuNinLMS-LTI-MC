export default { title: "templates/TopicNew" };

import TopicNew from "./TopicNew";
import { topic } from "samples";

const props = {
  topic,
  onSubmit: console.log,
  onDeleteSubtitle: console.log,
  onSubmitSubtitle: console.log,
};

export const Default = () => <TopicNew {...props} />;

export const Empty = () => <TopicNew {...{ ...props, topic: null }} />;
