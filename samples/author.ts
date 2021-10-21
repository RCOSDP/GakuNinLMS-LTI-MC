import type { AuthorSchema } from "$server/models/author";
import user from "./user";

const author: AuthorSchema = {
  ...user,
  roleName: "著者",
};

export default author;
