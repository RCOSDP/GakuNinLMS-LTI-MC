import { ComponentProps } from "react";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(1),
  },
}));

type Props = Pick<ComponentProps<typeof Button>, "onClick" | "className"> & {
  children: React.ReactNode;
};

export default function BackButton(props: Props) {
  const { children, onClick, className } = props;
  const classes = useStyles();
  return (
    <Button
      size="small"
      color="primary"
      variant="text"
      onClick={onClick}
      className={className}
    >
      <ArrowBackIcon className={classes.icon} />
      {children}
    </Button>
  );
}
