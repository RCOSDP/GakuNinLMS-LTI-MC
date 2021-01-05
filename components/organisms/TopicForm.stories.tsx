import TopicForm from "./TopicForm";
import { topic } from "samples";

export default { title: "organisms/TopicForm" };

const props = {
  topic,
  onSubmit: console.log,
  onSubtitleDelete: console.log,
  onSubtitleSubmit: console.log,
};

export const Default = () => <TopicForm {...props} />;
