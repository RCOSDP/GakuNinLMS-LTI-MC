import { IsInt } from "class-validator";
import { validationMetadatasToSchemas } from "class-validator-jsonschema";
import type { FromSchema } from "json-schema-to-ts";

export class BookParams {
  @IsInt()
  book_id!: number;
}

export const bookParamsSchema = validationMetadatasToSchemas().BookParams;

export const BookQuery = {
  type: "object",
  properties: {
    token: { type: "string" },
  },
} as const;

export type BookQuery = FromSchema<typeof BookQuery>;
