export default { title: "organisms/BookEditChildren" };

import { useState } from "react";
import BookEditChildren from "./BookEditChildren";
import { SectionSchema } from "$server/models/book/section";
import { sections as initialSections } from "samples";

const handleTopicClick = console.log;
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
const handleSectionCreate = (
  sections: SectionSchema[],
  setSections: (sections: SectionSchema[]) => void
) => () => {
  setSections([...sections, { name: null, id: Date.now(), topics: [] }]);
};

export const Default = () => {
  const [sections, setSections] = useState<SectionSchema[]>(initialSections);
  return (
    <BookEditChildren
      sections={sections}
      onTopicClick={handleTopicClick}
      onSectionsUpdate={handleSectionsUpdate(setSections)}
      onSectionCreate={handleSectionCreate(sections, setSections)}
    />
  );
};

export const Editable = () => {
  const [sections, setSections] = useState<SectionSchema[]>(initialSections);
  return (
    <BookEditChildren
      sections={sections}
      onTopicClick={handleTopicClick}
      onSectionsUpdate={handleSectionsUpdate(setSections)}
      onSectionCreate={handleSectionCreate(sections, setSections)}
      onTopicEditClick={handleTopicEditClick}
      isTopicEditable={() => true}
    />
  );
};
