import { IsInt } from "class-validator";
import { validationMetadatasToSchemas } from "class-validator-jsonschema";

export class UserParams {
  @IsInt()
  user_id!: number;
}

export const userParamsSchema = validationMetadatasToSchemas().UserParams;
