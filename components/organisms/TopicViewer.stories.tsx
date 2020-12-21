export default { title: "organisms/TopicViewer" };

import TopicPlayer from "./TopicViewer";
import { topic } from "samples";

const props = topic;

export const Default = () => <TopicPlayer {...props} />;
