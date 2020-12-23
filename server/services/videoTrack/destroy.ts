import { FastifySchema } from "fastify";
import {
  VideoTrackParams,
  videoTrackParamsSchema,
} from "$server/validators/videoTrackParams";
import destroyVideoTrack from "$server/utils/videoTrack/destroyVideoTrack";

export const destroySchema: FastifySchema = {
  description: "字幕の削除",
  params: videoTrackParamsSchema,
  response: {
    204: {},
  },
};

export async function destroy({ params }: { params: VideoTrackParams }) {
  await destroyVideoTrack(params.video_track_id);

  return { status: 204 };
}
