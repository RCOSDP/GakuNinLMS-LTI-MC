import { useCallback } from "react";
import { css } from "@emotion/css";
import { Dropdown } from "@mui/base/Dropdown";
import { Menu as BaseMenu, menuClasses } from "@mui/base/Menu";
import { MenuButton as BaseMenuButton } from "@mui/base/MenuButton";
import { MenuItem as BaseMenuItem, menuItemClasses } from "@mui/base/MenuItem";
import { styled } from "@mui/system";
import type { BookmarkProps, TagSchema } from "$server/models/bookmark";

const circle = css({
  display: "inline-block",
  borderRadius: "50%",
  width: "6px",
  height: "6px",
  marginRight: "8px",
});

// TODO: データベースから取得するように変更する
const tagMenus: TagSchema[] = [
  { id: 1, label: "なるほど", color: "red" },
  { id: 2, label: "難しい", color: "green" },
  { id: 3, label: "あとで見る", color: "blue" },
  { id: 4, label: "重要", color: "yellow" },
];

type Props = {
  topicId: number;
  selectedTag: TagSchema[];
  handleTagChange: (tag: TagSchema) => void;
  onSubmitBookmark: (body: BookmarkProps) => Promise<void>;
};

export default function TagMenu({
  topicId,
  selectedTag,
  handleTagChange,
  onSubmitBookmark,
}: Props) {
  const onClick = useCallback(
    async (option: TagSchema) => {
      handleTagChange(option);
      await onSubmitBookmark({ topicId, tagId: option.id });
    },
    [handleTagChange, onSubmitBookmark, topicId]
  );

  const filterTags = tagMenus.filter((tag) => {
    return selectedTag.every((selected) => selected.id !== tag.id);
  });

  if (filterTags.length === 0) {
    return null;
  }

  return (
    <Dropdown>
      <MenuButton>タグを追加...</MenuButton>
      <Menu slots={{ listbox: Listbox }}>
        {filterTags.map((option) => (
          <MenuItem
            key={option.id}
            value={option}
            onClick={async () => await onClick(option)}
          >
            <span style={{ background: option.color }} className={circle} />
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </Dropdown>
  );
}

const MenuButton = styled(BaseMenuButton)(
  () => `
  font-size: 12px;
  box-sizing: border-box;
  padding: 8px 12px;
  border-radius: 8px;
  text-align: left;
  background: #F9FAFB;
  border: 1px solid #F9FAFB;
  color: #339DFF;
  `
);

const Menu = styled(BaseMenu)(
  () => `
  &.${menuClasses.root} {
    margin-top: -12px !important;
    margin-left: 20px !important;
  }
  `
);

const Listbox = styled("ul")(
  () => `
  font-size: 12px;
  box-sizing: border-box;
  padding: 6px;
  width: 145px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: #fff;
  border: #fff;
  box-shadow: 0px 4px 6px rgba(0,0,0, 0.05)
  };
  `
);

const MenuItem = styled(BaseMenuItem)(
  () => `
  display: flex;
  align-items: center;
  list-style: none;
  padding: 8px;
  cursor: default;
  margin-right: -8px;
  margin-left: -8px;
  font-size: 12px;

  &:hover {
    background-color: #F9FAFB;
  }

  &.${menuItemClasses.focusVisible} {
    background-color: #F9FAFB;
    outline: none;
  }

  > span {
    margin-left: 8px;
  }
  `
);
