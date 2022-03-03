import type Method from "$server/types/method";
import { updateSchema, updateHooks, update } from "./update";

export type { Params, Query, Props } from "./update";

export const method: Method = {
  put: updateSchema,
};

export const hooks = {
  put: updateHooks,
};

export { update };
