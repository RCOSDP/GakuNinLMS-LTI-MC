import { useCallback } from "react";
import MenuItem from "@mui/material/MenuItem";
import type { SelectChangeEvent } from "@mui/material/Select";
import Select from "$atoms/Select";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import type { TagSchema } from "$server/models/bookmark";

type Props = Parameters<typeof Select>[0] & {
  tags: TagSchema[];
  selectedTagIds: TagSchema["id"][];
  isExistMemoContent: boolean;
  onTagSelect(value: TagSchema["id"][]): void;
  onClickMemoContent: (bool: boolean) => void;
};

function BookmarkMultiSelect(props: Props) {
  const {
    selectedTagIds,
    isExistMemoContent,
    onTagSelect,
    onClickMemoContent,
    tags,
    ...other
  } = props;
  const defaultValue = tags[0].id;
  const handleChange = useCallback(
    (event: SelectChangeEvent<unknown>) => {
      if (!Array.isArray(event.target.value)) {
        return;
      }

      onClickMemoContent(event.target.value.includes("メモ"));
      onTagSelect(
        event.target.value.filter(
          (value) => value !== "メモ"
        ) as TagSchema["id"][]
      );
    },
    [onClickMemoContent, onTagSelect]
  );

  return (
    <Select
      style={{ width: "200px" }}
      onChange={handleChange}
      defaultValue={[defaultValue]}
      {...other}
      multiple
      renderValue={(selected) => {
        if (!Array.isArray(selected)) {
          return null;
        }
        let renderValue = "";

        renderValue = tags
          .filter((tag) => selected.includes(tag.id))
          .map((tag) => tag.label)
          .join(", ");

        if (isExistMemoContent) {
          renderValue = renderValue ? renderValue + ", メモ" : "メモ";
        }
        return renderValue;
      }}
    >
      {tags.map((tag) => (
        <MenuItem key={tag.id} value={tag.id}>
          <Checkbox checked={selectedTagIds.includes(tag.id)} />
          <ListItemText primary={tag.label} />
        </MenuItem>
      ))}
      <MenuItem value={"メモ"}>
        <Checkbox checked={isExistMemoContent} />
        <ListItemText primary={"メモ"} />
      </MenuItem>
    </Select>
  );
}

export default BookmarkMultiSelect;
