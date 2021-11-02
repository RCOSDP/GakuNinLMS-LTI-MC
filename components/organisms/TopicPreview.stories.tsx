import type { Story } from "@storybook/react";
import { styled } from "@mui/material/styles";
import TopicPreview from "./TopicPreview";
import { topic } from "samples";

export default { title: "organisms/TopicPreview", component: TopicPreview };

const Wrapper = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, 320px)",
  gap: theme.spacing(2),
}));

const Template: Story<Parameters<typeof TopicPreview>[0]> = (args) => (
  <Wrapper>
    {[...Array(10)].map((_value, index) => (
      <TopicPreview key={index} {...args} />
    ))}
  </Wrapper>
);

export const Default = Template.bind({});
Default.args = {
  topic,
};

export const Checkable = Template.bind({});
Checkable.args = {
  ...Default.args,
  onChange: () => true,
};
