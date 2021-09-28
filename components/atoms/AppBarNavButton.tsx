import { ComponentProps, ReactNode } from "react";
import Button from "@mui/material/Button";
import makeStyles from "@mui/styles/makeStyles";

const useButtonStyles = makeStyles({
  label: {
    flexDirection: "column",
    lineHeight: 1.5,
  },
});

const useStyles = makeStyles({
  label: {
    fontSize: "0.75rem",
  },
});

type Props = ComponentProps<typeof Button> & {
  icon: ReactNode;
  label: string;
};

export default function AppBarNavButton(props: Props) {
  const buttonClasses = useButtonStyles();
  const classes = useStyles();
  const { icon, label, ...others } = props;
  return (
    <Button classes={buttonClasses} {...others}>
      {icon}
      <span className={classes.label}>{label}</span>
    </Button>
  );
}
