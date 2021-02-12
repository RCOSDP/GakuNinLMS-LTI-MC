import {
  ActivityTimeRangeProps,
  activityTimeRangePropsSchema,
} from "./activityTimeRange";

export type ActivityProps = {
  timeRanges: ActivityTimeRangeProps[];
};

export const activityPropsSchema = {
  type: "object",
  properties: {
    timeRanges: {
      type: "array",
      items: activityTimeRangePropsSchema,
    },
  },
};
