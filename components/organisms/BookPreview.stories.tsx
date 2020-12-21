export default { title: "organisms/BookPreview" };

import { makeStyles } from "@material-ui/core/styles";
import BookPreview from "./BookPreview";
import { book } from "samples";

const useStyles = makeStyles((theme) => ({
  margin: {
    "& > :not(:last-child)": {
      marginBottom: theme.spacing(2),
    },
  },
}));

const props = book;

export const Default = () => {
  const classes = useStyles();
  return (
    <div className={classes.margin}>
      {[...Array(10)].map((_value, index) => (
        <BookPreview key={index} {...props} />
      ))}
    </div>
  );
};
