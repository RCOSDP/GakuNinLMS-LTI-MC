import type { ResourceSchema } from "$server/models/resource";
import prisma from "$server/utils/prisma";

async function findResource(resourceId: ResourceSchema["id"]) {
  const resource = await prisma.resource.findUnique({
    where: { id: resourceId },
  });
  return resource;
}

export default findResource;
