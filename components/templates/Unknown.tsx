import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";
import useContainerStyles from "styles/container";
import { NEXT_PUBLIC_LMS_URL } from "$utils/env";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
}));

type Props = { children?: Node };

export default function BookUnknown(props: Props) {
  const classes = useStyles();
  const { children } = props;
  const containerClasses = useContainerStyles();
  return (
    <Container
      classes={containerClasses}
      className={classes.container}
      maxWidth="md"
    >
      <Typography variant="h4" gutterBottom={true}>
        ブックが未連携です
      </Typography>
      <Typography variant="body1">
        {children}
        <br />
        <Link href={NEXT_PUBLIC_LMS_URL}>LMSに戻る</Link>
      </Typography>
    </Container>
  );
}
