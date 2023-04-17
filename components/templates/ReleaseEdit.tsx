import Typography from "@mui/material/Typography";
import Container from "$atoms/Container";
import type { BookSchema } from "$server/models/book";
import ReleaseForm, { type ReleaseFormProps } from "$organisms/ReleaseForm";

type Props = ReleaseFormProps & {
  book: Pick<BookSchema, "name">;
  onDeleteButtonClick(book: Pick<BookSchema, "id">): void;
};

function ReleaseEdit(props: Props) {
  return (
    <Container
      maxWidth="md"
      sx={{
        my: 4,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h4">{props.book.name}</Typography>
      <ReleaseForm {...props} />
    </Container>
  );
}

export default ReleaseEdit;
