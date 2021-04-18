import { IsOptional, IsString, IsInt } from "class-validator";
import { validationMetadatasToSchemas } from "class-validator-jsonschema";

export class BooksImportParams {
  @IsOptional()
  @IsString()
  json?: string;
}

export const booksImportParamsSchema = validationMetadatasToSchemas().BooksImportParams;
