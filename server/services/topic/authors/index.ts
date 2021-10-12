import { AuthorsProps } from "$server/validators/authorsProps";
import { TopicParams } from "$server/validators/topicParams";
import { updateSchema, updateHooks, update } from "./update";

export type Params = TopicParams;
export type Props = AuthorsProps;

export const method = {
  put: updateSchema,
};

export const hooks = {
  put: updateHooks,
};

export { update };
