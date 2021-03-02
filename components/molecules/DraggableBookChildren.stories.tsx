export default { title: "molecules/DraggableBookChildren" };

import { useState } from "react";
import DraggableBookChildren from "./DraggableBookChildren";
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
  return <DraggableBookChildren sections={sections} {...handlers} />;
};
