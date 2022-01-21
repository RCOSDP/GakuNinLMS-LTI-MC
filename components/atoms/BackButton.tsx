import type { ComponentProps } from "react";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import makeStyles from "@mui/styles/makeStyles";

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
