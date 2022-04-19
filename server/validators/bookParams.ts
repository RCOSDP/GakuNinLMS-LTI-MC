import { IsInt } from "class-validator";
import { validationMetadatasToSchemas } from "class-validator-jsonschema";

export class BookParams {
  @IsInt()
  book_id!: number;
}

export const bookParamsSchema = validationMetadatasToSchemas().BookParams;
