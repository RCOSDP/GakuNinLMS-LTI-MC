import type { Section, Topic } from "@prisma/client";
import jsonSchema from "$server/prisma/json-schema.json";
import type { TopicSchema} from "$server/models/topic";
import { topicSchema } from "$server/models/topic";

export type SectionProps = {
  name?: Section["name"];
  topics: Array<Pick<Topic, "id">>;
};

const { id: topicId } = jsonSchema.definitions.Topic.properties;
const nameSchema = { type: "string", nullable: true };

export const sectionPropsSchema = {
  type: "object",
  properties: {
    name: nameSchema,
    topics: {
      type: "array",
      items: { type: "object", properties: { id: topicId } },
    },
  },
};

export type SectionSchema = Pick<Section, "id" | "name"> & {
  topics: TopicSchema[];
};

const { id } = jsonSchema.definitions.Section.properties;
export const sectionSchema = {
  type: "object",
  properties: {
    id,
    name: nameSchema,
    topics: {
      type: "array",
      items: topicSchema,
    },
  },
};
