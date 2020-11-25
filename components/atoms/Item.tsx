import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import gray from "theme/colors/gray";

const useStyles = makeStyles({
  item: {
    color: gray[700],
  },
});

export default function Item(props: { itemKey: string; value: string }) {
  const classes = useStyles();
  const { itemKey, value } = props;
  return (
    <Typography className={classes.item} variant="caption" component="span">
      {itemKey}: {value}
    </Typography>
  );
}
