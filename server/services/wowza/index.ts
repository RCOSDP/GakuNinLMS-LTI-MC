import { showSchema, showHooks, show } from "./show";
import create, { createSchema, createHooks } from "./create";

export type { Params, Query } from "./params";

export const method = {
  get: showSchema,
  post: createSchema,
};

export const hooks = {
  get: showHooks,
  post: createHooks,
};

export { show, create };
