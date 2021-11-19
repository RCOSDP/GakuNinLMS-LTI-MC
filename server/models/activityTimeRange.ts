import type { Prisma } from "@prisma/client";

export type ActivityTimeRangeProps =
  Prisma.ActivityTimeRangeCreateWithoutActivityInput;

export const activityTimeRangePropsSchema = {
  type: "object",
  properties: {
    startMs: { type: "integer" },
    endMs: { type: "integer" },
  },
} as const;
