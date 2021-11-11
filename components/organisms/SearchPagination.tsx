import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import { useSearchAtom } from "$store/search";

function SearchPagination({ className = "", hasNextPage = true }) {
  const searchProps = useSearchAtom();

  if (!hasNextPage && searchProps.query.page === 0) return null;

  return (
    <Grid container component="div" justifyContent="center">
      <Pagination
        className={className}
        color="primary"
        count={searchProps.query.page + 1 + Number(hasNextPage)}
        onChange={(_, count) =>
          searchProps.updateQuery((query) => ({
            ...query,
            page: count - 1,
          }))
        }
      />
    </Grid>
  );
}

export default SearchPagination;
