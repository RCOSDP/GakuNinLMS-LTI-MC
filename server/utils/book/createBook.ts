import { Topic, Section, TopicSection } from "@prisma/client";
import { TopicProps, TopicSchema } from "$server/models/topic";
import { BookProps } from "$server/models/book";
import { SectionProps } from "$server/models/book/section";
import prisma from "$server/utils/prisma";
import { topicCreateInput } from "$server/utils/topic";

const topicSectionCreateInput = (creatorId: Topic["creatorId"]) => (
  topic: TopicProps | TopicSchema,
  order: TopicSection["order"]
) => {
  const topicInput = topicCreateInput({ ...topic, creatorId });

  if (!("id" in topic)) {
    return {
      order: order,
      topic: { create: topicInput },
    };
  }

  return {
    order: order,
    topic: {
      connectOrCreate: {
        where: { id: topic.id },
        create: topicInput,
      },
    },
  };
};

const sectionCreateInput = (creatorId: Topic["creatorId"]) => (
  section: SectionProps,
  order: Section["order"]
) => {
  const topicSectionsCreateInput = section.topics.map(
    topicSectionCreateInput(creatorId)
  );

  return {
    order,
    name: section.name,
    topicSections: {
      create: topicSectionsCreateInput,
    },
  };
};

async function createBook(book: BookProps) {
  const { author, ...props } = book;

  const sectionsCreateInput = book.sections.map(sectionCreateInput(author.id));

  const { id } = await prisma.book.create({
    data: {
      ...props,
      details: {},
      author: { connect: { id: author.id } },
      sections: { create: sectionsCreateInput },
    },
  });

  return {
    ...book,
    id,
  };
}

export default createBook;
