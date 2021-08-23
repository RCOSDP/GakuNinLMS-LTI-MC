import type { Story } from "@storybook/react";
import BookTree from "./BookTree";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
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
