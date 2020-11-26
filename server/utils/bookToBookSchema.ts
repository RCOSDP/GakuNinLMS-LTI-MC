import {
  Book,
  Resource,
  Section,
  Topic,
  TopicSection,
  Video,
} from "$prisma/client";
import { BookSchema } from "$server/models/book";
import { SectionSchema } from "$server/models/book/section";
import { TopicSchema } from "$server/models/topic";

export const bookIncludingTopicsArg = {
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
} as const;

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

export function bookToBookSchema(book: BookWithTopics): BookSchema {
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
