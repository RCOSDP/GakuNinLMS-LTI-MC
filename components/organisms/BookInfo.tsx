import Card from "@material-ui/core/Card";
import { grey } from "@material-ui/core/colors";
import DescriptionList from "$atoms/DescriptionList";
import Markdown from "$atoms/Markdown";
import useCardStyle from "$styles/card";
import languages from "$utils/languages";
import formatInterval from "$utils/formatInterval";
import type { BookSchema } from "$server/models/book";

type Props = {
  className?: string;
  id?: string;
  book: BookSchema;
};

export default function BookInfo({ className, id, book }: Props) {
  const cardClasses = useCardStyle();

  return (
    <Card className={className} classes={cardClasses} id={id}>
      <DescriptionList
        color={grey[900]}
        value={[
          {
            key: "学習時間",
            value: formatInterval(0, (book.timeRequired ?? 0) * 1000),
          },
          {
            key: "教材の主要な言語",
            value: languages[book.language],
          },
        ]}
      />
      {book.description && <Markdown>{book.description}</Markdown>}
    </Card>
  );
}
