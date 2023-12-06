export default { title: "atoms/TagMenu" };

import TagMenu from "./TagMenu";
import { bookmark, bookmarkTagMenu } from "$samples";

export const Default = () => (
  <TagMenu
    topicId={bookmark.topicId}
    selectedTag={[bookmark.tag]}
    tagMenu={bookmarkTagMenu}
    handleTagChange={() => {}}
    onSubmitBookmark={async () => {}}
  />
);
