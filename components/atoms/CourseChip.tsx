import type { MouseEvent } from "react";
import { useCallback, useState } from "react";
import type { SxProps } from "@mui/system";
import { styled } from "@mui/material/styles";
import MuiChip from "@mui/material/Chip";
import MuiPopover, { popoverClasses } from "@mui/material/Popover";
import type { LtiResourceLinkSchema } from "$server/models/ltiResourceLink";

const Chip = styled(MuiChip)({
  maxWidth: "100%",
});

const Popover = styled(MuiPopover)(({ theme }) => ({
  pointerEvents: "none",
  [`.${popoverClasses.paper}`]: {
    padding: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
}));

type Props = {
  ltiResourceLink: LtiResourceLinkSchema;
  onLtiResourceLinkClick?(ltiResourceLink: LtiResourceLinkSchema): void;
  sx?: SxProps;
  onDelete?: () => void;
};

export default function CourseChip({
  ltiResourceLink,
  onLtiResourceLinkClick,
  sx,
  onDelete,
}: Props) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const handlePopoverOpen = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    },
    [setAnchorEl]
  );
  const handlePopoverClose = useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl]);
  const handleClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      onLtiResourceLinkClick?.(ltiResourceLink);
    },
    [ltiResourceLink, onLtiResourceLinkClick]
  );

  return (
    <>
      <Chip
        sx={sx}
        aria-haspopup="true"
        variant="outlined"
        size="small"
        color="primary"
        label={ltiResourceLink.contextLabel}
        onClick={onLtiResourceLinkClick && handleClick}
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
        {ltiResourceLink.contextTitle}
      </Popover>
    </>
  );
}
