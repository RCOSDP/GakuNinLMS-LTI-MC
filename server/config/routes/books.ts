import type { FastifyInstance } from "fastify";
import makeHooks from "$server/utils/makeHooks";
import handler from "$server/utils/handler";
import * as service from "$server/services/books";
import * as importService from "$server/services/booksImport";

export async function books(fastify: FastifyInstance) {
  const { method, index } = service;
  const hooks = makeHooks(fastify, service.hooks);

  fastify.get<{ Querystring: service.Query }>(
    "/books",
    { schema: method.get, ...hooks.get },
    handler(index)
  );
}

export async function importBooks(fastify: FastifyInstance) {
  const basePath = "/books/import";
  const { importSchema, importHooks, importBooks } = importService;
  const hooks = makeHooks(fastify, importHooks);

  fastify.post<{
    Body: importService.Params;
  }>(basePath, { schema: importSchema, ...hooks.post }, handler(importBooks));
}
