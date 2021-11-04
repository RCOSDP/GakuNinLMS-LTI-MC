import type { Resource } from "@prisma/client";
import type {
  VideoResourcePropsSchema,
  VideoResourceSchema,
} from "./videoResource";
import { videoResourcePropsSchema, videoResourceSchema } from "./videoResource";

export type ResourceProps = VideoResourcePropsSchema;

export type ResourceSchema = VideoResourceSchema | Resource;

export const resourcePropsSchema = videoResourcePropsSchema;

export const resourceSchema = {
  anyOf: [
    videoResourceSchema,
    {
      type: "object",
      properties: {
        id: { type: "integer" },
        url: { type: "string" },
        details: { type: "object" },
      },
    },
  ],
} as const;
