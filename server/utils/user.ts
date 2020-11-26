import {
  User,
  Book,
  Resource,
  Section,
  Topic,
  TopicSection,
  Video,
} from "$prisma/client";
import { UserProps } from "$server/models/user";
import { BookSchema } from "$server/models/book";
import { SectionSchema } from "$server/models/book/section";
import { TopicSchema } from "$server/models/topic";
import prisma from "./prisma";

export async function upsertUser(user: UserProps) {
  return await prisma.user.upsert({
    where: { ltiUserId: user.ltiUserId },
    create: user,
    update: user,
  });
}

export async function findWrittenBooks(
  userId: User["id"],
  page: number,
  perPage: number
): Promise<BookSchema[]> {
  const user = prisma.user.findUnique({ where: { id: userId } });
  const books = await user.writtenBooks({
    skip: page * perPage,
    take: perPage,
    include: {
      sections: {
        orderBy: {
          order: "asc",
        },
        include: {
          topicSections: {
            orderBy: {
              order: "asc",
            },
            include: {
              topic: { include: { resource: { include: { video: true } } } },
            },
          },
        },
      },
    },
  });

  return books.map(bookToBookSchema);
}

type TopicSectionWithTopic = TopicSection & {
  topic: Topic & {
    resource: Resource & {
      video: Video | null;
    };
  };
};

type SectionWithTopics = Section & {
  topicSections: TopicSectionWithTopic[];
};

type BookWithTopics = Book & {
  sections: SectionWithTopics[];
};

function bookToBookSchema(book: BookWithTopics): BookSchema {
  return {
    ...book,
    sections: book.sections.map(sectionToSectionSchema),
  };
}

function sectionToSectionSchema(section: SectionWithTopics): SectionSchema {
  return {
    ...section,
    topics: section.topicSections.map(topicSectionToTopicSchema),
  };
}

function topicSectionToTopicSchema(
  topicSection: TopicSectionWithTopic
): TopicSchema {
  return {
    ...topicSection,
    ...topicSection.topic,
    resource: {
      ...topicSection.topic.resource.video,
      ...topicSection.topic.resource,
    },
  };
}
