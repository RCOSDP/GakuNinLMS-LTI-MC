import type { MouseEvent } from "react";
import { useCallback, useState } from "react";
import type { SxProps } from "@mui/system";
import Chip from "@mui/material/Chip";
import Popover from "@mui/material/Popover";
import makeStyles from "@mui/styles/makeStyles";
import type { LtiResourceLinkSchema } from "$server/models/ltiResourceLink";

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: "none",
  },
  paper: {
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
  const classes = useStyles();
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
        className={classes.popover}
        classes={{ paper: classes.paper }}
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
