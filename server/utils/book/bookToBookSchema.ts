import type { Prisma, Section, TopicSection } from "@prisma/client";
import type { BookSchema } from "$server/models/book";
import type { SectionSchema } from "$server/models/book/section";
import type { TopicSchema } from "$server/models/topic";
import {
  authorArg,
  authorToAuthorSchema,
} from "$server/utils/author/authorToAuthorSchema";
import type { TopicWithResource } from "$server/utils/topic/topicToTopicSchema";
import {
  topicsWithResourcesArg,
  topicToTopicSchema,
} from "$server/utils/topic/topicToTopicSchema";
import {
  ltiResourceLinkIncludingContextArg,
  ltiResourceLinkToSchema,
} from "$server/utils/ltiResourceLink";

export const bookIncludingTopicsArg = {
  include: {
    authors: authorArg,
    ltiResourceLinks: ltiResourceLinkIncludingContextArg,
    keywords: true,
    sections: {
      orderBy: { order: "asc" },
      include: {
        topicSections: {
          orderBy: { order: "asc" },
          include: { topic: topicsWithResourcesArg },
        },
      },
    },
  },
} as const;

export const getBookIncludingArg = (userId: number) => {
  return {
    include: {
      authors: authorArg,
      ltiResourceLinks: ltiResourceLinkIncludingContextArg,
      keywords: true,
      sections: {
        orderBy: { order: "asc" },
        include: {
          topicSections: {
            orderBy: { order: "asc" },
            include: { topic: topicsWithResourcesArg },
          },
        },
      },
      publicBooks: {
        where: {
          userId,
        },
      },
    },
  } as const;
};

type TopicSectionWithTopic = TopicSection & {
  topic: TopicWithResource;
};

type SectionWithTopics = Section & {
  topicSections: TopicSectionWithTopic[];
};

export type BookWithTopics = Prisma.BookGetPayload<
  typeof bookIncludingTopicsArg
>;

export function bookToBookSchema(book: BookWithTopics): BookSchema {
  return {
    ...book,
    authors: book.authors.map(authorToAuthorSchema),
    ltiResourceLinks: book.ltiResourceLinks.map(ltiResourceLinkToSchema),
    sections: book.sections.map((section) => sectionToSectionSchema(section)),
  };
}

function sectionToSectionSchema(section: SectionWithTopics): SectionSchema {
  return {
    ...section,
    topics: section.topicSections.map((topicSection) =>
      topicSectionToTopicSchema(topicSection)
    ),
  };
}

function topicSectionToTopicSchema(
  topicSection: TopicSectionWithTopic
): TopicSchema {
  return {
    ...topicSection,
    ...topicToTopicSchema(topicSection.topic),
  };
}
