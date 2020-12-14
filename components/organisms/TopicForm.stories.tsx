import TopicForm from "./TopicForm";
import { topic } from "samples";

export default { title: "organisms/TopicForm" };

const props = { topic };

export const Default = () => <TopicForm {...props} />;
