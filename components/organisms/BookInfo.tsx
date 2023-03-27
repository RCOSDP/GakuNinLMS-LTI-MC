import Card from "@mui/material/Card";
import Markdown from "$atoms/Markdown";
import type { BookSchema } from "$server/models/book";
import KeywordChip from "$atoms/KeywordChip";
import useCardStyle from "$styles/card";
import { Box } from "@mui/material";

type Props = {
  className?: string;
  id?: string;
  book: BookSchema;
};

export default function BookInfo({ className, id, book }: Props) {
  const cardClasses = useCardStyle();

  return (
    <Card className={className} classes={cardClasses} id={id}>
      {book.keywords && (
        <Box sx={{ my: 1 }}>
          {book.keywords.map((keyword) => {
            return (
              <KeywordChip
                key={keyword.id}
                keyword={keyword}
                sx={{ mr: 0.5, maxWidth: "260px" }}
              />
            );
          })}
        </Box>
      )}
      {book.description && <Markdown>{book.description}</Markdown>}
    </Card>
  );
}
