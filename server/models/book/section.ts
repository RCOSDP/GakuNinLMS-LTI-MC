import { Section, Topic } from "@prisma/client";
import jsonSchema from "$server/prisma/json-schema.json";
import { TopicSchema, topicSchema } from "$server/models/topic";

export type SectionProps = {
  name?: Section["name"];
  topics: Array<Pick<Topic, "id">>;
};

const { id: topicId } = jsonSchema.definitions.Topic.properties;
export const sectionPropsSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      nullable: true,
    },
    topics: {
      type: "array",
      items: { type: "object", properties: { id: topicId } },
    },
  },
};

export type SectionSchema = Pick<Section, "id" | "name"> & {
  topics: TopicSchema[];
};

const { id, name } = jsonSchema.definitions.Section.properties;
export const sectionSchema = {
  type: "object",
  properties: {
    id,
    name,
    topics: {
      type: "array",
      items: topicSchema,
    },
  },
};
