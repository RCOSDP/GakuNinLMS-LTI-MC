import type { FromSchema } from "json-schema-to-ts";
import { ResourceParams } from "./resourceParams";

export const VideoTrackParams = {
  type: "object",
  required: ["video_track_id", ...ResourceParams.required],
  properties: {
    video_track_id: { type: "number" },
    ...ResourceParams.properties,
  },
  additionalProperties: false,
} as const;

export type VideoTrackParams = FromSchema<typeof VideoTrackParams>;
