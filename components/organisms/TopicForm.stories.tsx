import TopicForm from "./TopicForm";
import { topic } from "samples";

export default { title: "organisms/TopicForm" };

const props = {
  topic,
  onSubmit: console.log,
  onDeleteSubtitle: console.log,
  onSubmitSubtitle: console.log,
};

export const Default = () => <TopicForm {...props} />;
