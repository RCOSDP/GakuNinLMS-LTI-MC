import { IsInt } from "class-validator";
import { validationMetadatasToSchemas } from "class-validator-jsonschema";

export class TopicParams {
  @IsInt()
  topic_id!: number;
}

export const topicParamsSchema = validationMetadatasToSchemas().TopicParams;
