import type { BookParams } from "$server/validators/bookParams";
import type { ActivityQuery } from "$server/validators/activityQuery";
import { show, showHooks, showSchema } from "./show";
import { update, updateHooks, updateSchema } from "./update";

export type Params = BookParams;
export type Query = ActivityQuery;

export const method = {
  get: showSchema,
  put: updateSchema,
};

export const hooks = {
  get: showHooks,
  put: updateHooks,
};

export { show, update };
