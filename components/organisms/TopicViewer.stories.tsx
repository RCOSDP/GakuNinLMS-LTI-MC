export default { title: "organisms/TopicViewer" };

import TopicViewer from "./TopicViewer";
import { topic } from "samples";

const props = { topic };

export const Default = () => <TopicViewer {...props} />;
