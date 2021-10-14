import type { Topic, Prisma } from "@prisma/client";
import jsonSchema from "$server/prisma/json-schema.json";
import type {
  ResourceProps,
  ResourceSchema} from "./resource";
import {
  resourcePropsSchema,
  resourceSchema,
} from "./resource";
import { AuthorSchema } from "./author";

export type TopicProps = Pick<
  Prisma.TopicCreateInput,
  "name" | "language" | "timeRequired" | "shared" | "description"
> & {
  resource: ResourceProps;
};

export type TopicSchema = Topic & {
  authors: AuthorSchema[];
  resource: ResourceSchema;
};

const {
  id,
  name,
  language,
  timeRequired,
  shared,
  description,
  createdAt,
  updatedAt,
  details,
} = jsonSchema.definitions.Topic.properties;

export const topicPropsSchema = {
  type: "object",
  properties: {
    name,
    language: { ...language, nullable: true },
    timeRequired,
    shared: { ...shared, nullable: true },
    description,
    resource: resourcePropsSchema,
  },
};

export const topicSchema = {
  type: "object",
  properties: {
    id,
    name,
    language,
    timeRequired,
    shared,
    description,
    createdAt,
    updatedAt,
    details,
    authors: { type: "array", items: AuthorSchema },
    resource: resourceSchema,
  },
};
