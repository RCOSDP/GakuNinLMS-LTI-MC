import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@atoms/TextField";
import gray from "@theme/colors/gray";

const useCardStyles = makeStyles({
  root: {
    border: `1px solid ${gray[400]}`,
    borderRadius: 12,
    boxShadow: "none",
  },
});

const useStyles = makeStyles((theme) => ({
  margin: {
    "& > :not(:last-child)": {
      marginBottom: theme.spacing(2),
    },
  },
}));

export default function BookForms() {
  const cardClasses = useCardStyles();
  const classes = useStyles();
  return (
    <Card classes={cardClasses}>
      <Box className={classes.margin} px={3} py={2}>
        <TextField id="title" label="タイトル" fullWidth />
        <TextField id="timeRequired" label="学習時間" fullWidth />
        <Button variant="contained" color="primary">
          送信
        </Button>
      </Box>
    </Card>
  );
}
