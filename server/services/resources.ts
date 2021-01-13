import Method from "$server/types/method";
import { resourceSchema } from "$server/models/resource";
import {
  PaginationProps,
  paginationPropsSchema,
} from "$server/validators/paginationProps";
import findResources from "$server/utils/resource/findResources";
import { authInstructorHandler } from "$server/utils/authInstructorHandler";

export type Query = PaginationProps;

export const method: Method = {
  get: {
    description: "リソース一覧",
    querystring: paginationPropsSchema,
    response: {
      200: {
        description: "成功時",
        type: "object",
        properties: {
          resources: {
            type: "array",
            items: resourceSchema,
          },
          page: paginationPropsSchema.properties?.page,
          perPage: paginationPropsSchema.properties?.per_page,
        },
      },
    },
  },
};

export async function index({ query }: { query: Query }) {
  const page = query.page ?? 0;
  const perPage = query.per_page ?? 100;
  const resources = await findResources(page, perPage);

  return {
    status: 200,
    body: { resources, page, perPage },
  };
}

export const preHandler = authInstructorHandler;