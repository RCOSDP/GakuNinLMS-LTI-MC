import type { LtiResourceLinkProps } from "$server/models/ltiResourceLink";
import type { LtiResourceLinkParams } from "$server/validators/ltiResourceLinkParams";
import { showSchema, showHooks, show } from "./show";
import { updateSchema, updateHooks, update } from "./update";
import { destroySchema, destroyHooks, destroy } from "./destroy";

export type Params = LtiResourceLinkParams;
export type Props = LtiResourceLinkProps;

export const method = {
  get: showSchema,
  put: updateSchema,
  delete: destroySchema,
};

export const hooks = {
  get: showHooks,
  put: updateHooks,
  delete: destroyHooks,
};

export { show, update, destroy };
