import { useCallback, useMemo } from "react";
import clsx from "clsx";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import { LearnerSchema } from "$server/models/learner";
import { LearningStatus } from "$server/models/learningStatus";
import LearningStatusDot from "$atoms/LearningStatusDot";
import useSelectorProps from "$utils/useSelectorProps";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > :not(:last-child)": {
      marginRight: theme.spacing(1.5),
    },
  },
  item: {
    display: "inline-flex",
    alignItems: "center",
    "& > :first-child": {
      marginRight: theme.spacing(0.5),
    },
    "&$clickable": {
      textDecoration: "underline",
    },
  },
  button: {
    appearance: "none",
    border: "none",
    background: "transparent",
    padding: theme.spacing(0.5),
    cursor: "pointer",
    "&:disabled": {
      color: "unset",
      cursor: "default",
    },
  },
  clickable: {},
}));

function LearningStatusItem({
  type,
  label,
  learners,
  onLearnerClick,
}: {
  type: LearningStatus;
  label: string;
  learners: Array<LearnerSchema>;
  onLearnerClick?(learner: LearnerSchema): void;
}) {
  const classes = useStyles();
  const { onOpen, onSelect, ...menuProps } = useSelectorProps<null>(null);
  const handleLearnerClick = useCallback(
    (learner: LearnerSchema) => () => {
      onLearnerClick?.(learner);
      onSelect(null);
    },
    [onSelect, onLearnerClick]
  );
  const clickable = learners.length > 0;

  return (
    <>
      <button
        aria-controls={`learner-activities-menu-${type}`}
        className={clsx(classes.item, classes.button, {
          [classes.clickable]: clickable,
        })}
        disabled={!clickable}
        onClick={onOpen}
      >
        <LearningStatusDot type={type} />
        <span>
          {label}
          {learners.length}人
        </span>
      </button>
      <Menu
        {...menuProps}
        id={`learner-activities-menu-${type}`}
        aria-haspopup="true"
      >
        {[...learners].map((learner) => (
          <MenuItem key={learner.id} onClick={handleLearnerClick(learner)}>
            {learner.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

type Props = {
  className?: string;
  learners: Array<LearnerSchema>;
  completedLearners: Array<LearnerSchema>;
  incompletedLearners: Array<LearnerSchema>;
  onLearnerClick?(learner: LearnerSchema): void;
};

export default function LearningStatusItems(props: Props) {
  const {
    className,
    learners,
    completedLearners,
    incompletedLearners,
    onLearnerClick,
  } = props;
  const unopenedLearners = useMemo(() => {
    const map = new Map(learners.map(({ id, name }) => [id, name]));
    [...completedLearners, ...incompletedLearners].forEach(({ id }) =>
      map.delete(id)
    );
    return map;
  }, [learners, completedLearners, incompletedLearners]);
  const items = useMemo(
    () =>
      [
        {
          type: "completed",
          label: "完了",
          learners: completedLearners,
        },
        {
          type: "incompleted",
          label: "未完了",
          learners: incompletedLearners,
        },
        {
          type: "unopened",
          label: "未開封",
          learners: [...unopenedLearners].map(([id, name]) => ({ id, name })),
        },
      ] as const,
    [completedLearners, incompletedLearners, unopenedLearners]
  );
  const classes = useStyles();

  return (
    <div className={clsx(className, classes.root)}>
      {items.map((item, index) => (
        <LearningStatusItem
          key={index}
          {...item}
          onLearnerClick={onLearnerClick}
        />
      ))}
    </div>
  );
}
