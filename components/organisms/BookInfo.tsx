import formatDuration from "date-fns/formatDuration";
import intervalToDuration from "date-fns/intervalToDuration";
import ja from "date-fns/locale/ja";
import Card from "@material-ui/core/Card";
import { grey } from "@material-ui/core/colors";
import DescriptionList from "$atoms/DescriptionList";
import Markdown from "$atoms/Markdown";
import useCardStyle from "$styles/card";
import languages from "$utils/languages";
import type { BookSchema } from "$server/models/book";

function formatInterval(start: Date | number, end: Date | number) {
  const duration = intervalToDuration({ start, end });
  return formatDuration(duration, { locale: ja });
}

type Props = {
  className?: string;
  book: BookSchema;
};

export default function BookInfo({ className, book }: Props) {
  const cardClasses = useCardStyle();

  return (
    <Card className={className} classes={cardClasses}>
      <DescriptionList
        color={grey[900]}
        value={[
          {
            key: "学習時間",
            value:
              formatInterval(0, (book.timeRequired ?? 0) * 1000) || "10秒未満",
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
