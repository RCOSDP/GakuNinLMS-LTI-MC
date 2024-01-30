import type { BookmarkProps } from "$server/models/bookmark";
import type { BookmarkParams } from "$server/validators/bookmarkParams";
import { createSchema, createHooks, create } from "./create";

export type Props = BookmarkProps;

export type Params = BookmarkParams;

export const method = {
  post: createSchema,
};

export const hooks = {
  post: createHooks,
};

export { create };
