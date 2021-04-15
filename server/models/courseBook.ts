import { FromSchema } from "json-schema-to-ts";

/** 受講コースのブック */
export const CourseBookSchema = {
  type: "object",
  properties: {
    id: { type: "integer" },
    /** ブック名 */
    name: { type: "string" },
    /** セクション */
    sections: {
      type: "array",
      items: {
        type: "object",
        properties: {
          topics: {
            type: "array",
            items: {
              type: "object",
              properties: { id: { type: "integer" }, name: { type: "string" } },
              required: ["id", "name"],
            },
          },
        },
        required: ["topics"],
      },
    },
  },
  required: ["id", "name", "sections"],
} as const;

export type CourseBookSchema = FromSchema<typeof CourseBookSchema>;
