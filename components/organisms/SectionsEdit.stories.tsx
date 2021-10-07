import type { Story } from "@storybook/react";
import { useState } from "react";
import SectionsEdit from "./SectionsEdit";
import type { SectionSchema } from "$server/models/book/section";
import { sections as initialSections } from "$samples";

export default { title: "organisms/SectionsEdit", component: SectionsEdit };

const Template: Story<Parameters<typeof SectionsEdit>[0]> = (args) => {
  const [sections, setSections] = useState<SectionSchema[]>(initialSections);
  const handleSectionsUpdate = (sections: SectionSchema[]) => {
    setSections(
      sections.filter(
        (section: SectionSchema) =>
          section.name !== null || section.topics.length > 0
      )
    );
  };

  return (
    <SectionsEdit
      {...args}
      sections={sections}
      onSectionsUpdate={handleSectionsUpdate}
    />
  );
};

export const Default = Template.bind({});

export const Editable = Template.bind({});
Editable.args = {
  isTopicEditable: () => true,
};
