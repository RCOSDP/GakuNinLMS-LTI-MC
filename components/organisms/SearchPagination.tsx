import type { SxProps } from "@mui/system";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import { useSearchAtom } from "$store/search";

type Props = {
  className?: string;
  sx?: SxProps;
  totalCount: number;
};

function SearchPagination({ className = "", sx, totalCount }: Props) {
  const searchProps = useSearchAtom();
  const count = Math.ceil(totalCount / searchProps.query.perPage);

  if (!(count > 1)) return null;

  const page = searchProps.query.page + 1;
  return (
    <Grid
      className={className}
      sx={sx}
      container
      component="div"
      justifyContent="center"
    >
      <Pagination
        color="primary"
        page={page}
        count={count}
        onChange={(_, page) => searchProps.setPage(page - 1)}
      />
    </Grid>
  );
}

export default SearchPagination;
