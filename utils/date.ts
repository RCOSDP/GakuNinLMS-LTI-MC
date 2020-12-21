import { format as fnsFormat } from "date-fns";

export const format = (date: string | Date | undefined, format: string) => {
  return date instanceof Date ? fnsFormat(date, format) : "";
};
