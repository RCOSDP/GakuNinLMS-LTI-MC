import type { ElementType } from "react";
import Typography from "@mui/material/Typography";
import makeStyles from "@mui/styles/makeStyles";
import gray from "theme/colors/gray";

const useStyles = makeStyles({
  item: {
    color: gray[700],
  },
});

type Props = {
  itemKey: string;
  value: string;
  component?: ElementType;
};

export default function Item(props: Props) {
  const classes = useStyles();
  const { itemKey, value, component = "span" } = props;
  return (
    <Typography
      className={classes.item}
      variant="caption"
      component={component}
    >
      {itemKey}: {value}
    </Typography>
  );
}
