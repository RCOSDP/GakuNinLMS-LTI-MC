import { useCallback, useMemo } from "react";
import clsx from "clsx";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import { LearnerSchema } from "$server/models/learner";
import { LearningStatus } from "$server/models/learningStatus";
import LearningStatusDot from "$atoms/LearningStatusDot";
import useSelectorProps from "$utils/useSelectorProps";
import { grey, common } from "@material-ui/core/colors";

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
  menuHeader: {
    display: "flex",
    position: "sticky",
    backgroundColor: common.white,
    zIndex: 1,
    top: 0,
    alignItems: "center",
    margin: 0,
    padding: theme.spacing(1, 2),
    "& > :first-child": {
      marginRight: theme.spacing(0.5),
    },
    "& > h6": {
      margin: 0,
      fontSize: "0.875rem",
      color: grey[700],
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

function LearningStatusLabel({
  status,
  label,
  learners,
  onLearnerClick,
}: {
  status: LearningStatus;
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
        aria-controls={`learner-activities-menu-${status}`}
        className={clsx(classes.item, classes.button, {
          [classes.clickable]: clickable,
        })}
        disabled={!clickable}
        onClick={onOpen}
      >
        <LearningStatusDot status={status} />
        <span>
          {label}
          {learners.length}人
        </span>
      </button>
      <Menu
        {...menuProps}
        id={`learner-activities-menu-${status}`}
        aria-haspopup="true"
      >
        <section className={classes.menuHeader}>
          <LearningStatusDot status={status} />
          <h6>
            {label}
            {learners.length}人
          </h6>
        </section>
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

export default function LearningStatusLabels(props: Props) {
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
          status: "completed",
          label: "完了",
          learners: completedLearners,
        },
        {
          status: "incompleted",
          label: "未完了",
          learners: incompletedLearners,
        },
        {
          status: "unopened",
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
        <LearningStatusLabel
          key={index}
          {...item}
          onLearnerClick={onLearnerClick}
        />
      ))}
    </div>
  );
}
