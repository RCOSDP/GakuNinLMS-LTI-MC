import type { AuthorSchema } from "$server/models/author";
import user from "./user";

const author: AuthorSchema = {
  ...user,
  roleName: "作成者",
};

export default author;
