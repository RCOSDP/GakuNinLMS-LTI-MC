import type Method from "$server/types/method";
import type { TopicParams } from "$server/validators/topicParams";
import type { ActivityProps } from "$server/models/activity";
import { updateSchema, update } from "./update";

export type Params = TopicParams;
export type Props = ActivityProps;

export const method: Method = {
  put: updateSchema,
};

export { update };
