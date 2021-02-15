export default { title: "organisms/TopicViewer" };

import TopicViewer from "./TopicViewer";
import { topic } from "samples";

const defaultProps = { topic };

export const Default = () => <TopicViewer {...defaultProps} />;
