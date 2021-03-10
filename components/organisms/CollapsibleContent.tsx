import { useState } from "react";
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
  label: React.ReactNode;
  children: React.ReactNode;
};

export default function CollapsibleContent(props: Props) {
  const classes = useStyles();
  const { expanded: initialExpanded, label, children } = props;
  const [expanded, setExpanded] = useState(initialExpanded);
  const handleClick = () => setExpanded(!expanded);
  return (
    <>
      <Button variant="text" aria-expanded={expanded} onClick={handleClick}>
        <ChevronRightIcon
          className={clsx(classes.icon, { [classes.expanded]: expanded })}
        />
        {label}
      </Button>
      <Collapse in={expanded}>{children}</Collapse>
    </>
  );
}
