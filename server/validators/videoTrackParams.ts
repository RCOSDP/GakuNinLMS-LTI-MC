import { IsInt } from "class-validator";
import { validationMetadatasToSchemas } from "class-validator-jsonschema";
import { ResourceParams } from "./resourceParams";

export class VideoTrackParams extends ResourceParams {
  @IsInt()
  video_track_id!: number;
}

export const videoTrackParamsSchema = validationMetadatasToSchemas()
  .VideoTrackParams;
