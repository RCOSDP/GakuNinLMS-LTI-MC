import type { Story } from "@storybook/react";
import Box from "@mui/material/Box";
import Container from "./Container";

export default { title: "atoms/Container", component: Container };

const Template: Story<Parameters<typeof Container>[0]> = (args) => (
  <Container {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: <span>Child</span>,
};

export const TwoColumns = Template.bind({});
TwoColumns.args = {
  twoColumns: true,
  children: (
    <>
      <Box gridArea="title">Title</Box>
      <Box gridArea="description">Description</Box>
      <Box gridArea="action-header">Action Header</Box>
      <Box gridArea="side">Side</Box>
      <Box gridArea="items">Items</Box>
      <Box gridArea="skeleton">Skeleton</Box>
      <Box gridArea="search-pagination">Search Pagination</Box>
    </>
  ),
};
