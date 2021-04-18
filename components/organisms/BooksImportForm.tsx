import Card from "@material-ui/core/Card";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, Controller } from "react-hook-form";
import clsx from "clsx";
import TextField from "$atoms/TextField";
import useCardStyles from "styles/card";
import useInputLabelStyles from "styles/inputLabel";
import gray from "theme/colors/gray";
import { BooksImportParams, booksImportParamsSchema } from "$server/validators/booksImportParams";

const useStyles = makeStyles((theme) => ({
  margin: {
    "& > :not(:first-child)": {
      marginTop: theme.spacing(2.5),
    },
  },
  labelDescription: {
    marginLeft: theme.spacing(0.75),
    color: gray[600],
  },
}));

type Props = {
  importBooks?: booksImportParamsSchema;
  className?: string;
  onSubmit?: (book: BooksImportParams) => void;
};

export default function BooksImportForm(props: Props) {
  const {
    importBooks,
    className,
    onSubmit = () => undefined,
  } = props;
  const cardClasses = useCardStyles();
  const inputLabelClasses = useInputLabelStyles();
  const classes = useStyles();
  const defaultValues: BooksImportParams = {
    json: importBooks?.json ?? "",
  };
  const { handleSubmit, register, control } = useForm<BooksImportParams>({ defaultValues });

  return (
    <Card
      classes={cardClasses}
      className={clsx(classes.margin, className)}
      component="form"
      onSubmit={handleSubmit((values: BooksImportParams) => {
        onSubmit({ ...defaultValues, ...values });
      })}
    >
      <TextField
        label="json"
        fullWidth
        multiline
        name="json"
        inputRef={register}
      />
      <Button variant="contained" color="primary" type="submit">
        インポート
      </Button>
    </Card>
  );
}
