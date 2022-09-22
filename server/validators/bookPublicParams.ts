import { IsString, IsOptional } from "class-validator";
import { validationMetadatasToSchemas } from "class-validator-jsonschema";

export class BookPublicParams {
  @IsString()
  token!: string;
}

export const bookPublicParamsSchema =
  validationMetadatasToSchemas().BookPublicParams;

export class BookPublicHeaders {
  @IsString()
  @IsOptional()
  originreferer?: string;
}

export const bookPublicHeadersSchema =
  validationMetadatasToSchemas().BookPublicHeaders;
