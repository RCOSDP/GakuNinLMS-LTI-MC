import clsx from "clsx";
import Button from "@material-ui/core/Button";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Collapse from "@material-ui/core/Collapse";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  icon: {
    transition: theme.transitions.create("transform"),
  },
  expanded: {
    transform: "rotate(90deg)",
  },
}));

type Props = {
  expanded: boolean;
  label?: React.ReactNode;
  children: React.ReactNode;
  onCollapsibleContentClick?: Parameters<typeof Button>[0]["onClick"];
};

export default function CollapsibleContent({
  expanded,
  label,
  children,
  onCollapsibleContentClick,
}: Props) {
  const classes = useStyles();
  return (
    <>
      {label && (
        <Button
          variant="text"
          aria-expanded={expanded}
          onClick={onCollapsibleContentClick}
        >
          <ChevronRightIcon
            className={clsx(classes.icon, { [classes.expanded]: expanded })}
          />
          {label}
        </Button>
      )}
      <Collapse in={expanded}>{children}</Collapse>
    </>
  );
}
