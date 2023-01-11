import type { Story } from "@storybook/react";
import CourseTree from "./CourseTree";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ltiResourceLink, book } from "$samples";

export default {
  title: "organisms/CourseTree",
  component: CourseTree,
};

const Template: Story<Parameters<typeof CourseTree>[0]> = (args) => {
  return (
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      <CourseTree {...args} />
    </TreeView>
  );
};

export const Default = Template.bind({});

const ltiContext = {
  id: ltiResourceLink.contextId,
  label: ltiResourceLink.contextLabel,
  title: ltiResourceLink.contextTitle,
};

Default.args = {
  ltiContext,
  links: [
    {
      oauthClientId: ltiResourceLink.consumerId,
      createdAt: new Date(),
      updatedAt: new Date(),
      ltiContext,
      ltiResourceLink: {
        id: ltiResourceLink.id,
        title: ltiResourceLink.title,
      },
      book,
    },
  ],
  selected: new Set(),
  select: console.log,
  isContentEditable: () => true,
};
