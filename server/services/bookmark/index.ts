import type { BookMarkProps } from "$server/models/bookmark";
import { createSchema, createHooks, create } from "./create";

export type Props = BookMarkProps;

export const method = {
  post: createSchema,
};

export const hooks = {
  post: createHooks,
};

export { create };
