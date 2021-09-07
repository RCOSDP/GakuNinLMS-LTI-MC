export default { title: "organisms/SectionsEdit" };

import { useState } from "react";
import SectionsEdit from "./SectionsEdit";
import { SectionSchema } from "$server/models/book/section";
import { sections as initialSections } from "samples";

const handleTopicPreviewClick = console.log;
const handleTopicEditClick = console.log;
const handleSectionsUpdate =
  (setSections: (sections: SectionSchema[]) => void) =>
  (sections: SectionSchema[]) => {
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
    <SectionsEdit
      sections={sections}
      onTopicPreviewClick={handleTopicPreviewClick}
      onSectionsUpdate={handleSectionsUpdate(setSections)}
    />
  );
};

export const Editable = () => {
  const [sections, setSections] = useState<SectionSchema[]>(initialSections);
  return (
    <SectionsEdit
      sections={sections}
      onTopicPreviewClick={handleTopicPreviewClick}
      onSectionsUpdate={handleSectionsUpdate(setSections)}
      onTopicEditClick={handleTopicEditClick}
      isTopicEditable={() => true}
    />
  );
};
