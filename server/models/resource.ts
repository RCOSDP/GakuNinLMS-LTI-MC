import { Resource } from "@prisma/client";
import jsonSchema from "$server/prisma/json-schema.json";
import {
  VideoResourcePropsSchema,
  VideoResourceSchema,
  videoResourcePropsSchema,
  videoResourceSchema,
} from "./videoResource";

export type ResourceProps = VideoResourcePropsSchema;

export type ResourceSchema = VideoResourceSchema | Resource;

const { id, url, details } = jsonSchema.definitions.Resource.properties;

export const resourcePropsSchema = videoResourcePropsSchema;

export const resourceSchema = {
  anyOf: [
    videoResourceSchema,
    {
      type: "object",
      properties: {
        id,
        url,
        details,
      },
    },
  ],
};
