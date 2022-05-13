import { IsString, IsInt } from "class-validator";
import { validationMetadatasToSchemas } from "class-validator-jsonschema";

export class BookZoomParams {
  @IsInt()
  meetingId!: number;
}

export const bookZoomParamsSchema =
  validationMetadatasToSchemas().BookZoomParams;

export class BookZoomResponse {
  @IsString()
  publicToken!: string;
}

export const bookZoomResponseSchema =
  validationMetadatasToSchemas().BookZoomResponse;
