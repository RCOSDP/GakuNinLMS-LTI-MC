import {
  FastifyRequest,
  FastifyReply,
  RawRequestDefaultExpression,
  RawServerBase,
  RawServerDefault,
  RawReplyDefaultExpression,
} from "fastify";
import { RouteGenericInterface } from "fastify/types/route";
import Controller from "$server/types/controller";

const handler =
  <
    K extends keyof Controller,
    RouteGeneric extends RouteGenericInterface = RouteGenericInterface,
    RawServer extends RawServerBase = RawServerDefault,
    RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
    RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>
  >(
    method: Required<Controller<RouteGeneric, RawServer, RawRequest>>[K]
  ) =>
  async (
    request: FastifyRequest<RouteGeneric, RawServer, RawRequest>,
    reply: FastifyReply<RawServer, RawRequest, RawReply>
  ) => {
    const { status, headers, body } = await method(request);
    if (headers != null) reply.headers(headers);
    reply.code(status).send(body);
  };

export default handler;
