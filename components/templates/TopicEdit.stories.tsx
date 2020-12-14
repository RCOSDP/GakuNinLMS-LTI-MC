export default { title: "templates/TopicEdit" };

import TopicEdit from "./TopicEdit";
import { topic } from "samples";

const props = { topic };

export const Default = () => <TopicEdit {...props} />;
