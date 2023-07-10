import type { ResourceSchema } from "$server/models/resource";
import prisma from "$server/utils/prisma";
import makeSortOrderQuery from "$server/utils/makeSortOrderQuery";
import { resourceWithVideoArg, resourceToResourceSchema } from "./toSchema";

async function findResources(
  sort = "updated",
  page: number,
  perPage: number
): Promise<ResourceSchema[]> {
  const sortQuery = makeSortOrderQuery(sort);
  const resources = await prisma.resource.findMany({
    ...resourceWithVideoArg,
    orderBy: { url: sortQuery.name ?? "asc" },
    skip: page * perPage,
    take: perPage,
  });

  return resources.map((resource) => resourceToResourceSchema(resource));
}

export default findResources;
