import type { HTTPMethods } from "fastify";
import type { FastifyAuthFunction } from "@fastify/auth";

type Hooks = {
  [K in Lowercase<HTTPMethods>]?: {
    auth: FastifyAuthFunction[];
  };
};

export default Hooks;
