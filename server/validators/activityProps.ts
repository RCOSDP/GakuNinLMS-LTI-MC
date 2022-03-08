import type { FromSchema } from "json-schema-to-ts";
import { ActivityTimeRangeProps } from "./activityTimeRange";

export const ActivityProps = {
  type: "object",
  required: ["timeRanges"],
  properties: {
    timeRanges: {
      type: "array",
      items: ActivityTimeRangeProps,
    },
  },
  additionalProperties: false,
} as const;

export type ActivityProps = FromSchema<typeof ActivityProps>;
