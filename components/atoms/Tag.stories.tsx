export default { title: "atoms/Tag" };

import Tag from "./Tag";
import { bookmark } from "$samples";

export const Default = () => <Tag tag={bookmark.tag} />;
