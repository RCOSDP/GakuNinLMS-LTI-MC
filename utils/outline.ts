import { SectionSchema } from "$server/models/book/section";
import { TopicSchema } from "$server/models/topic";

export function isNamedSection(
  section: Pick<SectionSchema, "name" | "topics">
): boolean {
  return Boolean(section.name) || section.topics.length > 1;
}

export function getOutlineNumber(
  section: Pick<SectionSchema, "name" | "topics">,
  sectionIndex: number,
  topicIndex?: number
): string {
  const outlines = [`${sectionIndex + 1}`];
  if (typeof topicIndex === "number" && isNamedSection(section)) {
    outlines.push(`${topicIndex + 1}`);
  }
  return outlines.join(".");
}

export function getTopicOutline(
  section: SectionSchema,
  sectionIndex: number,
  topics: TopicSchema[]
): string {
  return topics
    .map(
      (topic, topicIndex) =>
        `${getOutlineNumber(section, sectionIndex, topicIndex)} ${topic.name}`
    )
    .join(" ");
}

export function getSectionsOutline(sections: SectionSchema[]): string {
  return sections
    .map((section, sectionIndex) =>
      !isNamedSection(section)
        ? getTopicOutline(section, sectionIndex, section.topics)
        : `${getOutlineNumber(section, sectionIndex)} ${
            section.name ?? "無名のセクション"
          } ${getTopicOutline(section, sectionIndex, section.topics)}`
    )
    .join(" ");
}
