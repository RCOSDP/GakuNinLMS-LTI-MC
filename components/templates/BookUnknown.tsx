import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import AppBar from "$organisms/AppBar";
import useContainerStyles from "styles/container";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
}));

export default function BookUnknown() {
  const classes = useStyles();
  const containerClasses = useContainerStyles();
  return (
    <>
      <AppBar position="sticky" />
      <Container
        classes={containerClasses}
        className={classes.container}
        maxWidth="md"
      >
        <Typography variant="h4" gutterBottom={true}>
          ブックが未連携です
        </Typography>
        <Typography variant="body1">
          LTIリンクがどのブックとも連携していません。担当教員にお問い合わせください。
          <a>LMSに戻る</a>
        </Typography>
      </Container>
    </>
  );
}
