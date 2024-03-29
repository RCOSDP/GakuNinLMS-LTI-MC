import type { BookProps } from "$server/models/book";
import type { BookParams } from "$server/validators/bookParams";
import { showSchema, showHooks, show } from "./show";
import { createSchema, createHooks, create } from "./create";
import { updateSchema, updateHooks, update } from "./update";
import { destroySchema, destroyHooks, destroy } from "./destroy";

export type Params = BookParams;
export type Props = BookProps;

export const method = {
  get: showSchema,
  post: createSchema,
  put: updateSchema,
  delete: destroySchema,
};

export const hooks = {
  get: showHooks,
  post: createHooks,
  put: updateHooks,
  delete: destroyHooks,
};

export { show, create, update, destroy };
