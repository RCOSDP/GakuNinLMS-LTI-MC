import { Section } from "@prisma/client";
import prisma from "$server/utils/prisma";

function cleanupSections(sectionIds: Section["id"][]) {
  return sectionIds.flatMap((id) => {
    return [
      prisma.topicSection.deleteMany({ where: { sectionId: id } }),
      prisma.section.deleteMany({ where: { id } }),
    ];
  });
}

export default cleanupSections;
