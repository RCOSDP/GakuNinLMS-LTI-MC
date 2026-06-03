import type { FastifyRequest, HTTPMethods } from "fastify";
import type { RouteGenericInterface } from "fastify/types/route";

type Controller<
  RouteGeneric extends RouteGenericInterface = RouteGenericInterface,
> = {
  [K in Lowercase<HTTPMethods>]?: (
    req: FastifyRequest<RouteGeneric>
  ) => Promise<{
    status: number;
    body?: unknown;
    headers?: Record<string, string>;
  }>;
};

export default Controller;
