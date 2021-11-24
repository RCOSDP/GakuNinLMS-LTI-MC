import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import { useSearchAtom } from "$store/search";

function SearchPagination({ className = "", hasNextPage = true }) {
  const searchProps = useSearchAtom();

  if (!hasNextPage && searchProps.query.page === 0) return null;

  const page = searchProps.query.page + 1;
  return (
    <Grid container component="div" justifyContent="center">
      <Pagination
        className={className}
        color="primary"
        page={page}
        count={page + Number(hasNextPage)}
        onChange={(_, page) => searchProps.setPage(page - 1)}
      />
    </Grid>
  );
}

export default SearchPagination;
