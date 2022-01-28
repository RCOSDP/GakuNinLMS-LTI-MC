import type { AuthorsProps } from "$server/models/authorsProps";
import type { BookParams } from "$server/validators/bookParams";
import { updateSchema, updateHooks, update } from "./update";

export type Params = BookParams;
export type Props = AuthorsProps;

export const method = {
  put: updateSchema,
};

export const hooks = {
  put: updateHooks,
};

export { update };
