import { IsOptional, IsInt } from "class-validator";
import { validationMetadatasToSchemas } from "class-validator-jsonschema";

export class PaginationProps {
  @IsOptional()
  @IsInt()
  page?: number;

  @IsOptional()
  @IsInt()
  per_page?: number;
}

export const paginationPropsSchema = validationMetadatasToSchemas()
  .PaginationProps;
