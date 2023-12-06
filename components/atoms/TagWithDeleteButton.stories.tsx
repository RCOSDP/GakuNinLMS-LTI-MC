export default { title: "atoms/TagWithDeleteButton" };

import TagWithDeleteButton from "./TagWithDeleteButton";
import { bookmark } from "$samples";

export const Default = () => (
  <TagWithDeleteButton
    topicId={1}
    bookmark={bookmark}
    onDeleteBookmark={async () => {}}
  />
);
