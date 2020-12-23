import { FastifySchema } from "fastify";
import {
  VideoTrackParams,
  videoTrackParamsSchema,
} from "$server/validators/videoTrackParams";
import findVideoTrack from "$server/utils/videoTrack/findVideoTrack";
import { Session } from "$utils/session";

export const showSchema: FastifySchema = {
  description: "字幕の取得",
  params: videoTrackParamsSchema,
  // @ts-expect-error NOTE: fastify-swagger用。型が用意されていない。
  produces: ["text/vtt"],
  response: {
    200: {},
    400: {},
    404: {},
  },
};

export async function show({
  session,
  params,
}: {
  session: Session;
  params: VideoTrackParams;
}) {
  console.log(session);
  console.log(params);
  if (!session.user) return { status: 400 };

  const videoTrack = await findVideoTrack(
    params.resource_id,
    params.video_track_id
  );

  return {
    status: videoTrack == null ? 404 : 200,
    headers: videoTrack == null ? undefined : { "Content-Type": "text/vtt" },
    body: videoTrack,
  };
}
