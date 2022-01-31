import { useCallback, useState } from "react";
import { styled } from "@mui/material/styles";
import MuiChip from "@mui/material/Chip";
import MuiPopover, { popoverClasses } from "@mui/material/Popover";
import type { SxProps } from "@mui/system";
import type { KeywordPropSchema } from "$server/models/keyword";

type Props = {
  keyword: KeywordPropSchema;
  onKeywordClick?(keyword: KeywordPropSchema): void;
  sx?: SxProps;
  onDelete?: () => void;
};

const Chip = styled(MuiChip)({
  borderRadius: 4,
  maxWidth: "100%",
});

const Popover = styled(MuiPopover)(({ theme }) => ({
  pointerEvents: "none",
  [`.${popoverClasses.paper}`]: {
    padding: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
}));

export default function KeywordChip({
  keyword,
  onKeywordClick,
  sx,
  onDelete,
}: Props) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const handlePopoverOpen = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    },
    [setAnchorEl]
  );
  const handlePopoverClose = useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl]);
  const handleClick = () => onKeywordClick?.(keyword);
  return (
    <>
      <Chip
        sx={sx}
        variant="outlined"
        size="small"
        color="primary"
        label={keyword.name}
        onClick={onKeywordClick && handleClick}
        onDelete={onDelete}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      />
      <Popover
        open={open}
        onClose={handlePopoverClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        disableRestoreFocus
      >
        {keyword.name}
      </Popover>
    </>
  );
}
