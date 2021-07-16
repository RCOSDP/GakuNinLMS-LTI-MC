import type { BookProps } from "$server/models/book";

export type BookPropsWithSubmitOptions = BookProps & {
  submitWithLink: boolean;
};
