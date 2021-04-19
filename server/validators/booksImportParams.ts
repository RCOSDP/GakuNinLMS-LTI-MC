import { IsOptional, IsString, ValidateNested } from "class-validator";
import { validationMetadatasToSchemas } from "class-validator-jsonschema";
import { BookProps, BookSchema } from "$server/models/book";

export class BooksImportParams {
  @IsOptional()
  @IsString()
  json?: string;
}

export const booksImportParamsSchema = validationMetadatasToSchemas().BooksImportParams;

export class BooksImportResult {
  @IsOptional()
  @ValidateNested({ each: true })
  books?: BookProps[];
  @IsOptional()
  @IsString({ each: true })
  errors?: string[];
}

export const booksImportResultSchema = validationMetadatasToSchemas().BooksImportResult;
