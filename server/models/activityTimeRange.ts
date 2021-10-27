import type { Prisma } from "@prisma/client";
import jsonSchema from "$server/prisma/json-schema.json";

export type ActivityTimeRangeProps =
  Prisma.ActivityTimeRangeCreateWithoutActivityInput;

const { startMs, endMs } = jsonSchema.definitions.ActivityTimeRange.properties;

export const activityTimeRangePropsSchema = {
  type: "object",
  properties: { startMs, endMs },
};
