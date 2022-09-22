import { IsString } from "class-validator";
import { validationMetadatasToSchemas } from "class-validator-jsonschema";

export class TopicResourceProps {
  @IsString()
  accessToken!: string;
}

export const topicResourcePropsSchema =
  validationMetadatasToSchemas().TopicResourceProps;
