export default { title: "templates/TopicEdit" };

import TopicEdit from "./TopicEdit";
import { topic } from "samples";

const defaultProps = {
  topic,
  onSubmit: console.log,
  onDelete: console.log,
  onCancel: () => console.log("back"),
  onSubtitleDelete: console.log,
  onSubtitleSubmit: console.log,
};

export const Default = () => <TopicEdit {...defaultProps} />;

export const Empty = () => <TopicEdit {...defaultProps} topic={null} />;
