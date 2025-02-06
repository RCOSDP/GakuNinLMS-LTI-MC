import type { Story } from "@storybook/react";
import BookTree from "./BookTree";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { book } from "$samples";

export default {
  title: "organisms/BookTree",
  component: BookTree,
};

const Template: Story<Parameters<typeof BookTree>[0]> = (args) => {
  return (
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      <BookTree {...args} />
    </TreeView>
  );
};

export const Default = Template.bind({});
Default.args = {
  book,
};
