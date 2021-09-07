export default { title: "molecules/DraggableSections" };

import { useState } from "react";
import DraggableSections from "./DraggableSections";
import { SectionSchema } from "$server/models/book/section";
import { sections as initialSections } from "$samples";

export const Default = () => {
  const [sections, setSections] = useState<SectionSchema[]>(initialSections);
  const handleSectionCreate = () => {
    setSections([...sections, { name: null, id: Date.now(), topics: [] }]);
  };
  const handlers = {
    onSectionsUpdate: setSections,
    onSectionCreate: handleSectionCreate,
  };
  return <DraggableSections sections={sections} {...handlers} />;
};
