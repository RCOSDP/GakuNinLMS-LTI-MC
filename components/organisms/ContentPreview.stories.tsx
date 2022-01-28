import type { Story } from "@storybook/react";
import { styled } from "@mui/material/styles";
import ContentPreview from "./ContentPreview";
import { topic, book } from "$samples";

export default { title: "organisms/ContentPreview", component: ContentPreview };

const Wrapper = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, 320px)",
  gap: theme.spacing(2),
}));

const Template: Story<Parameters<typeof ContentPreview>[0]> = (args) => (
  <Wrapper>
    {[...Array(10)].map((_value, index) => (
      <ContentPreview key={index} {...args} />
    ))}
  </Wrapper>
);

export const Default = Template.bind({});
Default.args = {
  content: { type: "topic", ...topic },
};

export const Checkable = Template.bind({});
Checkable.args = {
  ...Default.args,
  onChange: () => true,
};

export const Book = Template.bind({});
Book.args = {
  content: { type: "book", ...book },
};
