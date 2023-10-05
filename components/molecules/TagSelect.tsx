import type { ForwardedRef, RefAttributes } from "react";
import { useState, forwardRef, useCallback } from "react";
import { css } from "@emotion/css";
import type { SelectProps } from "@mui/base/Select";
import { Select } from "@mui/base/Select";
import { Option, optionClasses } from "@mui/base/Option";
import { Popper } from "@mui/base/Popper";
import { styled } from "@mui/system";
import type { BookmarkProps, TagSchema } from "$server/models/bookmark";

const circle = css({
  display: "inline-block",
  borderRadius: "50%",
  width: "6px",
  height: "6px",
  marginRight: "8px",
});

const tagOptionClass = css({
  display: "flex",
  alignItems: "center",
  fontSize: "12px",
  boxSizing: "border-box",
  width: "100%",
  padding: "8px 12px",
  borderRadius: "8px",
  textAlign: "left",
  background: "#F9FAFB",
});

const tagClass = css({
  display: "flex",
  alignItems: "center",
  padding: "4px 16px",
  background: "#FFF",
  borderRadius: "999px",
  border: "solid 1px #F3F4F6",
});

type TagSelectProps = TagSchema & {
  display: string;
};

const tagOptions: TagSelectProps[] = [
  { id: 1, label: "INTERESTING", color: "red", display: "なるほど" },
  { id: 2, label: "DIFFICULT", color: "green", display: "難しい" },
  { id: 3, label: "LATER", color: "blue", display: "あとで見る" },
  { id: 4, label: "IMPORTANT", color: "yellow", display: "重要" },
];

type Props = {
  topicId: number;
  onSubmitBookmark: (body: BookmarkProps) => Promise<void>;
};

export default function TagSelect({ topicId, onSubmitBookmark }: Props) {
  const [tagOption, setTagOption] = useState<TagSelectProps | null>(null);
  const onClick = useCallback(
    async (option: TagSelectProps) => {
      setTagOption(option);
      await onSubmitBookmark({ topicId, tagId: option.id });
    },
    [onSubmitBookmark, topicId]
  );

  if (tagOption) {
    return (
      <div className={tagOptionClass}>
        <div className={tagClass}>
          <span style={{ background: tagOption.color }} className={circle} />
          {tagOption.display}
        </div>
      </div>
    );
  }

  return (
    <CustomSelect placeholder="タグを追加...">
      {tagOptions.map((option) => (
        <StyledOption
          key={option.id}
          value={option}
          selected={option === tagOption}
          onClick={async () => await onClick(option)}
        >
          <span style={{ background: option.color }} className={circle} />
          {option.display}
        </StyledOption>
      ))}
    </CustomSelect>
  );
}

const CustomSelect = forwardRef(function CustomSelect<
  TValue extends Record<string, never>,
  Multiple extends boolean
>(props: SelectProps<TValue, Multiple>, ref: ForwardedRef<HTMLButtonElement>) {
  const slots: SelectProps<TValue, Multiple>["slots"] = {
    root: StyledButton,
    listbox: StyledListbox,
    popper: StyledPopper,
    ...props.slots,
  };

  return <Select {...props} ref={ref} slots={slots} />;
}) as <TValue extends Record<string, never>, Multiple extends boolean>(
  props: SelectProps<TValue, Multiple> & RefAttributes<HTMLButtonElement>
) => JSX.Element;

const StyledButton = styled("button")(
  () => `
  font-size: 12px;
  box-sizing: border-box;
  width: 100%;
  padding: 8px 12px;
  border-radius: 8px;
  text-align: left;
  background: #F9FAFB;
  border: 1px solid #F9FAFB;
  color: #339DFF;
  `
);

const StyledListbox = styled("ul")(
  () => `
  font-size: 12px;
  box-sizing: border-box;
  padding: 6px;
  margin: 14px 0;
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

const StyledOption = styled(Option)(
  () => `
  display: flex;
  align-items: center;
  list-style: none;
  padding: 8px;
  cursor: default;
  margin-right: -8px;
  margin-left: -8px;
  font-size: 12px;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionClasses.selected} {
    background-color: #F9FAFB;
  }

  &.${optionClasses.highlighted} {
    background-color: #F9FAFB;
  }

  &.${optionClasses.highlighted}.${optionClasses.selected} {
    background-color: #F9FAFB;
  }

  &:hover:not(.${optionClasses.disabled}) {
    background-color: #F9FAFB;
  }
  `
);

const StyledPopper = styled(Popper)`
  z-index: 1;
`;
