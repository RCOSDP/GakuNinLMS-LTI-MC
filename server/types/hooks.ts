import { HTTPMethods } from "fastify";
import { FastifyAuthFunction } from "fastify-auth";

type Hooks = {
  [K in Lowercase<HTTPMethods>]?: {
    auth: FastifyAuthFunction[];
  };
};

export default Hooks;
