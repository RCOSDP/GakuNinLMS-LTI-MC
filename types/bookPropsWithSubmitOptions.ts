import type { BookProps } from "$server/models/book";
import type { AuthorsProps } from "$server/models/authorsProps";

// TODO: AuthorsProps は BookProps に統合して移行したい
export type BookPropsWithSubmitOptions = BookProps & {
  authors: AuthorsProps["authors"];
  submitWithLink: boolean;
  topics?: number[];
};
