export default { title: "atoms/Item" };

import Item from "./Item";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  margin: {
    "& > :not(:last-child)": {
      marginRight: theme.spacing(1.75),
    },
  },
}));

export const Default = () => {
  const classes = useStyles();
  return (
    <div className={classes.margin}>
      <Item itemKey="作成日" value="2020.11.19" />
      <Item itemKey="更新日" value="2020.11.19" />
      <Item itemKey="著者" value="山田太郎" />
    </div>
  );
};
