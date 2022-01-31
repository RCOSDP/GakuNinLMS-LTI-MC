import type { MouseEvent } from "react";
import { useCallback } from "react";
import type { SxProps } from "@mui/system";
import { styled } from "@mui/material/styles";
import MuiChip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import type { LtiResourceLinkSchema } from "$server/models/ltiResourceLink";

const Chip = styled(MuiChip)({
  maxWidth: "100%",
});

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
  const handleClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      onLtiResourceLinkClick?.(ltiResourceLink);
    },
    [ltiResourceLink, onLtiResourceLinkClick]
  );

  return (
    <Tooltip title={ltiResourceLink.contextTitle}>
      <Chip
        sx={sx}
        aria-haspopup="true"
        variant="outlined"
        size="small"
        color="primary"
        label={ltiResourceLink.contextLabel}
        onClick={onLtiResourceLinkClick && handleClick}
        onDelete={onDelete}
      />
    </Tooltip>
  );
}
