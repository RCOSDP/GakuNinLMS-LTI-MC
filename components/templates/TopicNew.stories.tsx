export default { title: "templates/TopicNew" };

import TopicNew from "./TopicNew";
import { topic } from "samples";

const props = { topic };

export const Default = () => <TopicNew {...props} />;

export const Empty = () => <TopicNew topic={null} />;
