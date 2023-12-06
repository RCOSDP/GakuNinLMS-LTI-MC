export default { title: "molecules/TagList" };

import TagList from "./TagList";
import { bookmark, bookmarkTagMenu } from "$samples";

export const Default = () => (
  <TagList topicId={1} bookmarks={[bookmark]} tagMenu={bookmarkTagMenu} />
);
