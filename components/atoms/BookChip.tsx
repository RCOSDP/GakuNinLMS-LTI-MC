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
  onRelatedBookClick?: (relatedBook: RelatedBook) => void;
  onRelatedBookDelete?: (relatedBook: RelatedBook) => void;
  sx?: SxProps;
};

export default function BookChip({
  relatedBook,
  onRelatedBookClick,
  sx,
  onRelatedBookDelete,
}: Props) {
  const handleClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      onRelatedBookClick?.(relatedBook);
    },
    [onRelatedBookClick, relatedBook]
  );

  const handleDelete = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      onRelatedBookDelete?.(relatedBook);
    },
    [onRelatedBookDelete, relatedBook]
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
        onDelete={onRelatedBookDelete && handleDelete}
      />
    </Tooltip>
  );
}
