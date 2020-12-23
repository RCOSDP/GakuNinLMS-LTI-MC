import { IsInt } from "class-validator";
import { validationMetadatasToSchemas } from "class-validator-jsonschema";

export class ResourceParams {
  @IsInt()
  resource_id!: number;
}

export const resourceParamsSchema = validationMetadatasToSchemas()
  .ResourceParams;
