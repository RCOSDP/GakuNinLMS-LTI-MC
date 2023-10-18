import { IsInt } from "class-validator";
import { validationMetadatasToSchemas } from "class-validator-jsonschema";

export class BookmarkParams {
  @IsInt()
  topic_id!: number;
}

export const bookmarkParamsSchema =
  validationMetadatasToSchemas().BookmarkParams;
