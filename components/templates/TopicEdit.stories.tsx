export default { title: "templates/TopicEdit" };

import TopicEdit from "./TopicEdit";
import { topic } from "samples";

const props = { topic };

export const Default = () => <TopicEdit {...props} />;

export const Empty = () => <TopicEdit topic={null} />;
