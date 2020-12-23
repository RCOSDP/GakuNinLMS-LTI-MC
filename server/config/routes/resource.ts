import { FastifyInstance } from "fastify";
import handler from "$server/utils/handler";
import * as service from "$server/services/videoTrack";

export async function videoTrack(fastify: FastifyInstance) {
  const basePath = "/resource/:resource_id/video_track";
  const pathWithParams = `${basePath}/:video_track_id`;
  const vttPath = `${pathWithParams}/vtt`;
  const { method, show, create, destroy } = service;
  const preHandler = service.preHandler(fastify);

  fastify.get<{
    Params: service.Params;
  }>(vttPath, { schema: method.get }, handler(show));

  fastify.post<{
    Params: service.CreateParams;
    Body: service.CreateBody;
  }>(basePath, { schema: method.post, preHandler }, handler(create));

  fastify.delete<{
    Params: service.Params;
  }>(pathWithParams, { schema: method.delete, preHandler }, handler(destroy));
}
