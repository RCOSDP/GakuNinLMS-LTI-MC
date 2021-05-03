import { format, formatDuration, intervalToDuration } from "date-fns";
import { ja } from "date-fns/locale";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { makeStyles } from "@material-ui/core/styles";
import Item from "$atoms/Item";
import { BookSchema } from "$server/models/book";
import useCardStyles from "$styles/card";
import languages from "$utils/languages";

function formatInterval(start: Date | number, end: Date | number) {
  const duration = intervalToDuration({ start, end });
  return formatDuration(duration, { locale: ja });
}

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(0.5),
  },
  items: {
    "& > *": {
      display: "inline-block",
      marginRight: theme.spacing(1.25),
      marginBottom: theme.spacing(0.25),
    },
  },
  description: {
    margin: theme.spacing(2.5, 0, 2),
    whiteSpace: "pre-wrap",
  },
}));

type Props = {
  book: BookSchema;
  open: boolean;
  onClose: React.MouseEventHandler;
};

export default function BookItemDialog(props: Props) {
  const cardClasses = useCardStyles();
  const classes = useStyles();
  const { book, open, onClose } = props;
  const timeRequired =
    formatInterval(0, (book.timeRequired ?? 0) * 1000) || "10秒未満";
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ classes: cardClasses }}
      fullWidth
    >
      <DialogContent>
        <Typography className={classes.title} variant="h6">
          {book.name}
        </Typography>
        <div className={classes.items}>
          <Typography variant="body1">学習時間 {timeRequired}</Typography>
          <Typography variant="body1">{languages[book.language]}</Typography>
          {/* TODO: ブックがライセンスをプロパティに持つようになったら表示してください
          <Typography variant="body1">
            ライセンス
          </Typography>
          */}
        </div>
        <div className={classes.items}>
          <Item
            itemKey="作成日"
            value={format(new Date(book.createdAt), "yyyy.MM.dd")}
          />
          <Item
            itemKey="更新日"
            value={format(new Date(book.updatedAt), "yyyy.MM.dd")}
          />
          <Item itemKey="著者" value={book.author.name} />
        </div>
        <p className={classes.description}>{book.description}</p>
      </DialogContent>
    </Dialog>
  );
}
