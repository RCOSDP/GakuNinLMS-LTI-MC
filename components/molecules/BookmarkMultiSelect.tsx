import { useCallback } from "react";
import MenuItem from "@mui/material/MenuItem";
import type { SelectChangeEvent } from "@mui/material/Select";
import Select from "$atoms/Select";
import type { TagSchema } from "$server/models/bookmark";

type Props = Parameters<typeof Select>[0] & {
  tags: TagSchema[];
  onTagSelect(value: TagSchema["id"][]): void;
  onClickMemoContent: () => void;
};

function BookmarkMultiSelect(props: Props) {
  const { onTagSelect, onClickMemoContent, tags, ...other } = props;
  const defaultValue = tags[0].id;
  const handleChange = useCallback(
    (event: SelectChangeEvent<unknown>) => {
      if (event.target.value === "bookmarkMemo") {
        onClickMemoContent();
        return;
      }
      onTagSelect(event.target.value as TagSchema["id"][]);
    },
    [onClickMemoContent, onTagSelect]
  );
  return (
    <Select
      onChange={handleChange}
      defaultValue={[defaultValue]}
      {...other}
      multiple
    >
      {tags.map((tag) => (
        <MenuItem key={tag.id} value={tag.id}>
          {tag.label}
        </MenuItem>
      ))}
      <MenuItem value={"bookmarkMemo"}>メモ</MenuItem>
    </Select>
  );
}

export default BookmarkMultiSelect;
