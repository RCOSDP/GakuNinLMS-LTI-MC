export default { title: "organisms/BookEditChildren" };

import { useState } from "react";
import BookEditChildren from "./BookEditChildren";
import { SectionSchema } from "$server/models/book/section";
import { sections as initialSections } from "samples";

const handleTopicPreviewClick = console.log;
const handleTopicEditClick = console.log;
const handleSectionsUpdate = (
  setSections: (sections: SectionSchema[]) => void
) => (sections: SectionSchema[]) => {
  setSections(
    sections.filter(
      (section: SectionSchema) =>
        section.name !== null || section.topics.length > 0
    )
  );
};

export const Default = () => {
  const [sections, setSections] = useState<SectionSchema[]>(initialSections);
  return (
    <BookEditChildren
      sections={sections}
      onTopicPreviewClick={handleTopicPreviewClick}
      onSectionsUpdate={handleSectionsUpdate(setSections)}
    />
  );
};

export const Editable = () => {
  const [sections, setSections] = useState<SectionSchema[]>(initialSections);
  return (
    <BookEditChildren
      sections={sections}
      onTopicPreviewClick={handleTopicPreviewClick}
      onSectionsUpdate={handleSectionsUpdate(setSections)}
      onTopicEditClick={handleTopicEditClick}
      isContentEditable={() => true}
    />
  );
};
