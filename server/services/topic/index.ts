import Method from "$server/types/method";
import { TopicParams } from "$server/validators/topicParams";
import { showSchema, show } from "./show";

export type Params = TopicParams;

export const method: Method = {
  get: showSchema,
};

export const service = { get: show };
