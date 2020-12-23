import type { FastifyRequest, FastifySchema } from "fastify";
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

export async function create(
  req: FastifyRequest<{
    Params: ResourceParams;
    Body: CreateBody;
  }>
) {
  const url = `${req.protocol}://${req.hostname}${req.url}`;
  const created = await createVideoTrack(url, req.params.resource_id, req.body);

  return {
    status: created == null ? 400 : 201,
    body: created,
  };
}
