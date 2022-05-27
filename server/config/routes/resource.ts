import type { FastifyInstance } from "fastify";
import makeHooks from "$server/utils/makeHooks";
import handler from "$server/utils/handler";
import * as videoTrackService from "$server/services/videoTrack";
import * as oembedService from "$server/services/oembed";

export async function videoTrack(fastify: FastifyInstance) {
  const basePath = "/resource/:resource_id/video_track";
  const pathWithParams = `${basePath}/:video_track_id`;
  const vttPath = `${pathWithParams}/vtt`;
  const { method, show, create, destroy } = videoTrackService;
  const hooks = makeHooks(fastify, videoTrackService.hooks);

  fastify.get<{
    Params: videoTrackService.Params;
    Querystring: videoTrackService.Query;
  }>(vttPath, { schema: method.get, ...hooks.get }, handler(show));

  fastify.post<{
    Params: videoTrackService.CreateParams;
    Body: videoTrackService.CreateBody;
  }>(basePath, { schema: method.post, ...hooks.post }, handler(create));

  fastify.delete<{
    Params: videoTrackService.Params;
  }>(
    pathWithParams,
    { schema: method.delete, ...hooks.delete },
    handler(destroy)
  );
}

export async function oembed(fastify: FastifyInstance) {
  const path = "/resource/:resource_id/oembed";
  const { method, index } = oembedService;
  const hooks = makeHooks(fastify, oembedService.hooks);

  fastify.get<{
    Params: oembedService.Params;
  }>(path, { schema: method.get, ...hooks.get }, handler(index));
}
