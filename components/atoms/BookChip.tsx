import type { MouseEvent } from "react";
import { useCallback } from "react";
import type { SxProps } from "@mui/system";
import { styled } from "@mui/material/styles";
import MuiChip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import type { RelatedBook } from "$server/models/topic";

const Chip = styled(MuiChip)({
  maxWidth: "100%",
});

type Props = {
  relatedBook: RelatedBook;
  onRelatedBookClick?(id: number): void;
  sx?: SxProps;
  onDelete?: () => void;
};

export default function BookChip({
  relatedBook,
  onRelatedBookClick,
  sx,
  onDelete,
}: Props) {
  const handleClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      onRelatedBookClick?.(relatedBook.id);
    },
    [onRelatedBookClick, relatedBook.id]
  );

  return (
    <Tooltip
      title={relatedBook.description || relatedBook.name}
      disableInteractive
    >
      <Chip
        sx={sx}
        aria-haspopup="true"
        variant="outlined"
        size="small"
        color="primary"
        label={relatedBook.name}
        onClick={handleClick}
        onDelete={onDelete}
      />
    </Tooltip>
  );
}
