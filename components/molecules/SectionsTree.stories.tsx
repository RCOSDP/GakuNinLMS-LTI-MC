import type { Story } from "@storybook/react";
import SectionsTree from "./SectionsTree";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { sections } from "$samples";

export default {
  title: "molecules/SectionsTree",
  component: SectionsTree,
  argTypes: { selectable: { control: "boolean" } },
};

type ArgTypes = {
  selectable: boolean;
};

const Template: Story<Parameters<typeof SectionsTree>[0] & ArgTypes> = ({
  selectable,
  onTreeChange,
  ...args
}) => {
  return (
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      <SectionsTree
        {...args}
        onTreeChange={selectable ? onTreeChange : undefined}
      />
    </TreeView>
  );
};

export const Default = Template.bind({});
Default.args = {
  sections,
};

export const Editable = Template.bind({});
Editable.args = {
  ...Default.args,
  isContentEditable: () => true,
};
