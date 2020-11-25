import { FastifyInstance } from "fastify";
import {
  preValidationHookHandler,
  preValidationAsyncHookHandler,
  preHandlerHookHandler,
  preHandlerAsyncHookHandler,
} from "fastify/types/hooks";

type Hook = {
  preValidation?: (
    fastify: FastifyInstance
  ) => preValidationHookHandler | preValidationAsyncHookHandler;
  preHandler?: (
    fastify: FastifyInstance
  ) => preHandlerHookHandler | preHandlerAsyncHookHandler;
};

export default Hook;
