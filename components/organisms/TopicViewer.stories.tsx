import type { Story } from "@storybook/react";
import TopicViewer from "./TopicViewer";
import { topic } from "samples";

export default { title: "organisms/TopicViewer", component: TopicViewer };

const Template: Story<Parameters<typeof TopicViewer>[0]> = (args) => (
  <TopicViewer {...args} />
);

export const Default = Template.bind({});
Default.args = {
  topic,
};
