import { IsString, IsInt, IsOptional } from "class-validator";
import { validationMetadatasToSchemas } from "class-validator-jsonschema";

export class BookZoomParams {
  @IsInt()
  meetingId!: number;
}

export const bookZoomParamsSchema =
  validationMetadatasToSchemas().BookZoomParams;

export class BookZoomResponse {
  @IsInt()
  @IsOptional()
  bookId?: number;
  @IsString()
  @IsOptional()
  publicToken?: string;
}

export const bookZoomResponseSchema =
  validationMetadatasToSchemas().BookZoomResponse;
