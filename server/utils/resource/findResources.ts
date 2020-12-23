import { ResourceSchema } from "$server/models/resource";
import prisma from "$server/utils/prisma";
import { resourceWithVideoArg, resourceToResourceSchema } from "./toSchema";

async function findResources(
  page: number,
  perPage: number
): Promise<ResourceSchema[]> {
  const resources = await prisma.resource.findMany({
    ...resourceWithVideoArg,
    skip: page * perPage,
    take: perPage,
  });

  return resources.map(resourceToResourceSchema);
}

export default findResources;
