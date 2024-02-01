import type { BookmarkMemoContentProps } from "$server/models/bookmarkMemoContent";
import { createSchema, createHooks, create } from "./create";

export type Props = BookmarkMemoContentProps;

export const method = {
  post: createSchema,
};

export const hooks = {
  post: createHooks,
};

export { create };
