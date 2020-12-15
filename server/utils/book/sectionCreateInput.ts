import { Topic, Section, TopicSection } from "@prisma/client";
import { SectionProps } from "$server/models/book/section";

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

export default sectionCreateInput;
