import type { Topic, Prisma } from "@prisma/client";
import type { ResourceProps, ResourceSchema } from "./resource";
import { resourcePropsSchema, resourceSchema } from "./resource";
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

export const topicPropsSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    language: { type: "string", nullable: true },
    timeRequired: { type: "integer" },
    shared: { type: "boolean", nullable: true },
    description: { type: "string" },
    resource: resourcePropsSchema,
  },
} as const;

export const topicSchema = {
  type: "object",
  properties: {
    id: { type: "integer" },
    name: { type: "string" },
    language: { type: "string" },
    timeRequired: { type: "integer" },
    shared: { type: "boolean" },
    description: { type: "string" },
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" },
    details: { type: "object" },
    authors: { type: "array", items: AuthorSchema },
    resource: resourceSchema,
  },
} as const;
