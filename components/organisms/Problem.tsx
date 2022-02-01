import type { ReactNode } from "react";
import makeStyles from "@mui/styles/makeStyles";
import Typography from "@mui/material/Typography";
import Container from "$atoms/Container";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
}));

type Props = { title: ReactNode; children?: ReactNode };

export default function Problem(props: Props) {
  const classes = useStyles();
  const { title, children } = props;
  return (
    <Container className={classes.container} maxWidth="md">
      <Typography variant="body1" component="section">
        <Typography variant="h4" gutterBottom={true}>
          {title}
        </Typography>
        {children}
      </Typography>
    </Container>
  );
}
