import type { FastifyInstance } from "fastify";
import makeHooks from "$server/utils/makeHooks";
import handler from "$server/utils/handler";
import * as service from "$server/services/videoTrack";

export async function videoTrack(fastify: FastifyInstance) {
  const basePath = "/resource/:resource_id/video_track";
  const pathWithParams = `${basePath}/:video_track_id`;
  const vttPath = `${pathWithParams}/vtt`;
  const { method, show, create, destroy } = service;
  const hooks = makeHooks(fastify, service.hooks);

  fastify.get<{
    Params: service.Params;
  }>(vttPath, { schema: method.get, ...hooks.get }, handler(show));

  fastify.post<{
    Params: service.CreateParams;
    Body: service.CreateBody;
  }>(basePath, { schema: method.post, ...hooks.post }, handler(create));

  fastify.delete<{
    Params: service.Params;
  }>(
    pathWithParams,
    { schema: method.delete, ...hooks.delete },
    handler(destroy)
  );
}
