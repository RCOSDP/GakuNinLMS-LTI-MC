import type { FastifySchema } from "fastify";
import {
  VideoTrackProps,
  videoTrackPropsSchema,
  videoTrackSchema,
} from "$server/models/videoTrack";
import {
  ResourceParams,
  resourceParamsSchema,
} from "$server/validators/resourceParams";
import createVideoTrack from "$server/utils/videoTrack/createVideoTrack";

export type CreateBody = VideoTrackProps;

export const createSchema: FastifySchema = {
  description: "字幕ファイルのアップロード",
  params: resourceParamsSchema,
  body: videoTrackPropsSchema,
  response: {
    201: videoTrackSchema,
    400: {},
  },
};

export async function create({
  params,
  body,
}: {
  params: ResourceParams;
  body: CreateBody;
}) {
  const created = await createVideoTrack(params.resource_id, body);

  return {
    status: created == null ? 400 : 201,
    body: created,
  };
}
