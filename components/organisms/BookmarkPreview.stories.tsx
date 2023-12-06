export default { title: "organisms/BookmarkPreview" };

import BookmarkPreview from "./BookmarkPreview";
import { bookmark } from "$samples";

export const Default = () => <BookmarkPreview bookmark={bookmark} />;
