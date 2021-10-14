import type { BookSchema} from "$server/models/book";
import { bookSchema } from "$server/models/book";
import { paginationPropsSchema } from "$server/validators/paginationProps";

export type UserBooksSchema = {
  books: BookSchema[];
  page?: number;
  perPage?: number;
};

export const userBooksSchema = {
  description: "作成したブックの一覧",
  type: "object",
  properties: {
    books: {
      type: "array",
      items: bookSchema,
    },
    page: paginationPropsSchema.properties?.page,
    perPage: paginationPropsSchema.properties?.per_page,
  },
};
