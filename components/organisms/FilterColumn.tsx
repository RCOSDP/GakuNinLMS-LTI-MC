import type { SxProps } from "@mui/system";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import AuthorFilter from "$atoms/AuthorFilter";
import SharedFilter from "$atoms/SharedFilter";
import CourseChip from "$atoms/CourseChip";
import TextField from "$atoms/TextField";
import licenses from "$utils/licenses";
import { useSearchAtom } from "$store/search";

type Props = { sx?: SxProps; variant: "book" | "topic" };

export default function FilterColumn({ sx, variant }: Props) {
  const {
    query,
    searchQuery,
    onAuthorFilterChange,
    onSharedFilterChange,
    onLicenseFilterChange,
    onLtiContextDelete,
    onKeywordDelete,
  } = useSearchAtom();

  return (
    <Box sx={sx}>
      <Typography sx={{ pt: 4, mb: 4 }} variant="h5">
        絞り込み
      </Typography>
      <AuthorFilter
        sx={{ display: "flex", mb: 2 }}
        onFilterChange={onAuthorFilterChange}
      />
      <SharedFilter
        sx={{ display: "flex", mb: 2 }}
        disabled={query.filter === "other"}
        onFilterChange={onSharedFilterChange}
      />
      {variant === "topic" && (
        <TextField
          label="ライセンス"
          select
          fullWidth
          defaultValue=""
          onChange={(event) => {
            onLicenseFilterChange(String(event.target.value));
          }}
          inputProps={{ displayEmpty: true }}
          sx={{ mb: 2, maxWidth: "80%" }}
        >
          <MenuItem value="">すべて</MenuItem>
          {Object.entries(licenses).map(([value, { name }]) => (
            <MenuItem key={value} value={value}>
              {name}
            </MenuItem>
          ))}
        </TextField>
      )}
      <FormControl component="fieldset" sx={{ display: "block", mb: 2 }}>
        <FormLabel component="legend" sx={{ mb: 1 }}>
          コース
        </FormLabel>
        {(searchQuery.link?.length ?? 0) < 1 && <Typography>なし</Typography>}
        {searchQuery.link?.map((ltiResourceLink) => (
          <CourseChip
            sx={{ mr: 0.5 }}
            key={ltiResourceLink.contextId}
            ltiResourceLink={ltiResourceLink}
            onDelete={() => onLtiContextDelete(ltiResourceLink)}
          />
        ))}
      </FormControl>
      <FormControl component="fieldset" sx={{ display: "block" }}>
        <FormLabel component="legend" sx={{ mb: 1 }}>
          キーワード
        </FormLabel>
        {(searchQuery.keyword?.length ?? 0) < 1 && (
          <Typography>なし</Typography>
        )}
        {searchQuery.keyword?.map((keyword) => (
          <Chip
            key={keyword}
            variant="outlined"
            color="primary"
            label={keyword}
            size="small"
            sx={{ mr: 0.5, borderRadius: 1 }}
            onDelete={() => onKeywordDelete(keyword)}
          />
        ))}
      </FormControl>
    </Box>
  );
}
