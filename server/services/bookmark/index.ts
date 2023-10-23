import type { BookmarkProps } from "$server/models/bookmark";
import { createSchema, createHooks, create } from "./create";

export type Props = BookmarkProps;

export const method = {
  post: createSchema,
};

export const hooks = {
  post: createHooks,
};

export { create };
