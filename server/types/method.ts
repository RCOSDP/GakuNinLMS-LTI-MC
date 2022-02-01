import type { FastifySchema, HTTPMethods } from "fastify";
import "fastify-swagger";

type Method = {
  [K in Lowercase<HTTPMethods>]?: FastifySchema;
};

export default Method;
