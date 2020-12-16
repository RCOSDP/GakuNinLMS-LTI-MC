export default { title: "templates/TopicEdit" };

import TopicEdit from "./TopicEdit";
import { Topic } from "types/book";
import { topic } from "samples";

const props = { topic };

export const Default = () => <TopicEdit {...props} />;

export const Empty = () => <TopicEdit topic={{} as Topic} />;
