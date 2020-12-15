import { Topic, Section, TopicSection } from "@prisma/client";
import { UserSchema } from "$server/models/user";
import { BookProps } from "$server/models/book";
import { SectionProps } from "$server/models/book/section";
import prisma from "$server/utils/prisma";

const topicSectionCreateInput = (
  topicId: Topic["id"],
  order: TopicSection["order"]
) => ({ order, topic: { connect: { id: topicId } } });

const sectionCreateInput = (section: SectionProps, order: Section["order"]) => {
  const topicSectionsCreateInput = section.topicIds.map(
    topicSectionCreateInput
  );

  return {
    order,
    name: section.name,
    topicSections: {
      create: topicSectionsCreateInput,
    },
  };
};

async function createBook(authorId: UserSchema["id"], book: BookProps) {
  const sectionsCreateInput = book.sections.map(sectionCreateInput);

  const { id } = await prisma.book.create({
    data: {
      ...book,
      details: {},
      author: { connect: { id: authorId } },
      sections: { create: sectionsCreateInput },
    },
  });

  return {
    ...book,
    id,
  };
}

export default createBook;
