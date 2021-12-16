import MuiContainer from "@mui/material/Container";
import { styled } from "@mui/material/styles";

type Props = Parameters<typeof MuiContainer>[0] & {
  twoColumns?: boolean;
};

const Container = styled(({ twoColumns: _, ...other }: Props) => (
  <MuiContainer {...other} />
))<Props>(({ theme, twoColumns }) => [
  { marginBottom: theme.spacing(10) },
  twoColumns && {
    display: "grid",
    gridTemplateAreas: `
          ". title"
          ". description"
          "side action-header"
          "side items"
          "side skeleton"
          "side search-pagination"
        `,
    gridTemplateColumns: "256px 1fr",
    columnGap: 2,
  },
]);

export default Container;
