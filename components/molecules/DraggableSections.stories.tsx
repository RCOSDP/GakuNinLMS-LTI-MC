import type { Story } from "@storybook/react";
import { useState } from "react";
import DraggableSections from "./DraggableSections";
import type { SectionSchema } from "$server/models/book/section";
import { sections as initialSections } from "$samples";

export default {
  title: "molecules/DraggableSections",
  component: DraggableSections,
};

const Template: Story<Parameters<typeof DraggableSections>[0]> = (args) => {
  const [sections, setSections] = useState<SectionSchema[]>(initialSections);
  const handleSectionCreate = () => {
    setSections([...sections, { name: null, id: Date.now(), topics: [] }]);
  };
  return (
    <DraggableSections
      {...args}
      sections={sections}
      onSectionsUpdate={setSections}
      onSectionCreate={handleSectionCreate}
    />
  );
};

export const Default = Template.bind({});
