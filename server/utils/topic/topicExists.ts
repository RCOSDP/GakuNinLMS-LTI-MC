import { Topic } from "@prisma/client";
import prisma from "$server/utils/prisma";
import {
  authorArg,
  authorToAuthorSchema,
} from "$server/utils/author/authorToAuthorSchema";

async function topicExists(topicId: Topic["id"]) {
  const topic = await prisma.topic.findUnique({
    where: { id: topicId },
    select: { authors: authorArg },
  });

  return (
    topic && { ...topic, authors: topic.authors.map(authorToAuthorSchema) }
  );
}

export default topicExists;
