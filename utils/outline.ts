import { SectionSchema } from "$server/models/book/section";

export function getOutline(
  section: Pick<SectionSchema, "name" | "topics">,
  sectionIndex: number,
  topicIndex?: number
): string {
  const outlines = [`${sectionIndex + 1}`];
  const isNamedSection = Boolean(section.name);
  const hasMultipleTopic = section.topics.length > 1;
  if (typeof topicIndex === "number" && (isNamedSection || hasMultipleTopic)) {
    outlines.push(`${topicIndex + 1}`);
  }
  return outlines.join(".");
}
