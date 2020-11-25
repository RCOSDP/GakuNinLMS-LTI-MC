import { FastifyRequest, HTTPMethods } from "fastify";

type Controller = {
  [K in Lowercase<HTTPMethods>]?: (
    req: FastifyRequest
  ) => Promise<{
    status: number;
    body?: unknown;
    headers?: Record<string, string>;
  }>;
};

export default Controller;
