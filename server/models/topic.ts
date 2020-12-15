import { Topic, Prisma } from "@prisma/client";
import jsonSchema from "$server/prisma/json-schema.json";
import {
  ResourceProps,
  ResourceSchema,
  resourcePropsSchema,
  resourceSchema,
} from "./resource";
import { UserSchema, userSchema } from "./user";

export type TopicProps = Pick<
  Prisma.TopicCreateWithoutCreatorInput,
  "name" | "timeRequired" | "description"
> & {
  resource: ResourceProps;
};

export type TopicSchema = Omit<Topic, "creatorId"> & {
  creator: UserSchema;
  resource: ResourceSchema;
};

const {
  id,
  name,
  timeRequired,
  description,
  createdAt,
  updatedAt,
  details,
} = jsonSchema.definitions.Topic.properties;

export const topicPropsSchema = {
  type: "object",
  properties: {
    name,
    timeRequired,
    description,
    resource: resourcePropsSchema,
  },
};

export const topicSchema = {
  type: "object",
  properties: {
    id,
    name,
    timeRequired,
    description,
    createdAt,
    updatedAt,
    details,
    creator: userSchema,
    resource: resourceSchema,
  },
};
