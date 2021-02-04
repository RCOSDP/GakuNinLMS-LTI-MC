import clsx from "clsx";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { gray } from "theme/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    top: 0,
    zIndex: 1,
    backgroundColor: gray[50],
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(4),
    "& > *": {
      marginRight: theme.spacing(1),
    },
  },
  action: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: theme.spacing(-2),
    "& > *": {
      marginRight: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  },
  container: {
    padding: 0,
  },
  sticky: {
    position: "sticky",
  },
  absolute: {
    position: "absolute",
  },
}));

type Props = {
  component?: React.ElementType;
  position?: "sticky" | "absolute";
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  title: React.ReactNode | string;
  action: React.ReactNode | string;
  onSubmit?(event: React.FormEvent<Element>): void;
};

export default function TopBar(props: Props) {
  const {
    component: Component = "div",
    position = "sticky",
    maxWidth,
    title,
    action,
    onSubmit,
  } = props;
  const classes = useStyles();
  return (
    <Component
      className={clsx(classes.root, classes[position])}
      onSubmit={onSubmit}
    >
      <Container
        className={clsx({ [classes.container]: !maxWidth })}
        maxWidth={maxWidth}
      >
        <Typography className={classes.title} variant="h4" gutterBottom>
          {title}
        </Typography>
        {action && <div className={classes.action}>{action}</div>}
      </Container>
    </Component>
  );
}
