export default { title: "atoms/Button" };

import Button from "@mui/material/Button";
import makeStyles from "@mui/styles/makeStyles";
import AddIcon from "@mui/icons-material/Add";
import LinkIcon from "@mui/icons-material/Link";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

const useStyles = makeStyles((theme) => ({
  margin: {
    "& > *": {
      marginRight: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  },
  icon: {
    marginRight: theme.spacing(0.5),
  },
}));

export const Default = () => {
  const classes = useStyles();

  return (
    <div className={classes.margin}>
      <Button variant="contained" color="primary">
        送信
      </Button>
      <Button variant="outlined" color="primary">
        連携しない
      </Button>
      <Button size="small" color="primary">
        <AddIcon className={classes.icon} />
        ブックの作成
      </Button>
      <Button size="small" variant="contained" color="primary">
        <AddIcon className={classes.icon} />
        ブックの作成
      </Button>
      <Button size="small" variant="outlined" color="primary">
        <AddIcon className={classes.icon} />
        ブックの作成
      </Button>
      <Button size="small" color="primary">
        <LinkIcon className={classes.icon} />
        「〇〇」で提供
      </Button>
      <Button size="small" variant="contained" color="primary">
        <LinkIcon className={classes.icon} />
        「〇〇」で提供
      </Button>
      <Button size="small" variant="contained" color="primary">
        <DragIndicatorIcon fontSize="small" />
        並び替え
      </Button>
      <Button size="small" variant="outlined" color="primary">
        <DragIndicatorIcon fontSize="small" />
        並び替え
      </Button>
    </div>
  );
};
