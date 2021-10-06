import { IsNotEmpty, IsString } from "class-validator";
import { validationMetadatasToSchemas } from "class-validator-jsonschema";

export class LtiResourceLinkParams {
  @IsNotEmpty()
  @IsString()
  lti_consumer_id!: string;

  @IsNotEmpty()
  @IsString()
  lti_resource_link_id!: string;
}

export const ltiResourceLinkParamsSchema =
  validationMetadatasToSchemas().LtiResourceLinkParams;
