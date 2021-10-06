import clsx from "clsx";
import Button from "@mui/material/Button";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Collapse from "@mui/material/Collapse";
import makeStyles from "@mui/styles/makeStyles";

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
  "aria-controls"?: string;
  children: React.ReactNode;
  onCollapsibleContentClick?: Parameters<typeof Button>[0]["onClick"];
};

export default function CollapsibleContent({
  expanded,
  label,
  children,
  "aria-controls": ariaControls,
  onCollapsibleContentClick,
}: Props) {
  const classes = useStyles();
  return (
    <>
      {label && (
        <Button
          variant="text"
          aria-expanded={expanded}
          aria-controls={ariaControls}
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
