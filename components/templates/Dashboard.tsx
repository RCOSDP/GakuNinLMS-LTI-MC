import { useState, useCallback } from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import GetAppOutlinedIcon from "@material-ui/icons/GetAppOutlined";
import { makeStyles } from "@material-ui/core/styles";
import ActionHeader from "$organisms/ActionHeader";
import LearningStatusDot from "$atoms/LearningStatusDot";
import LearningActivityItem from "$molecules/LearningActivityItem";
import LearnerActivityItem from "$molecules/LearnerActivityItem";
import useContainerStyles from "$styles/container";
import useCardStyles from "$styles/card";
import type { CourseBookSchema } from "$server/models/courseBook";
import type { BookActivitySchema } from "$server/models/bookActivity";
import type { SessionSchema } from "$server/models/session";
import type { UserSchema } from "$server/models/user";
import { gray } from "$theme/colors";
import download from "$utils/bookLearningActivity/download";
import getLearnerActivities from "$utils/getLearnerActivities";
import getActivitiesByBooks from "$utils/getActivitiesByBooks";

type TabPanelProps = {
  className?: string;
  children?: React.ReactNode;
  index: number;
  value: number;
};

function TabPanel({
  className,
  children,
  value,
  index,
  ...other
}: TabPanelProps) {
  return (
    <div
      className={className}
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel=${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  contextLabel: {
    fontSize: "0.875rem",
    color: gray[700],
  },
  card: {
    paddingTop: 0,
  },
  tabs: {
    margin: theme.spacing(0, -3, 2),
    borderBottom: `1px solid ${gray[300]}`,
  },
  items: {
    "& > :not(:last-child)": {
      marginBottom: theme.spacing(4),
    },
  },
  learners: {
    overflowX: "auto",
  },
  learnersLabel: {
    marginBottom: theme.spacing(2),
    "& > :not(:last-child)": {
      marginRight: theme.spacing(1.5),
    },
    "& > *": {
      display: "inline-flex",
      alignItems: "center",
      "& > :first-child": {
        marginRight: theme.spacing(0.5),
      },
    },
  },
}));

type Props = {
  session: SessionSchema;
  learners: Array<Pick<UserSchema, "id" | "name">>;
  courseBooks: CourseBookSchema[];
  bookActivities: BookActivitySchema[];
};

export default function Dashboard(props: Props) {
  const { session, learners, courseBooks, bookActivities } = props;
  const classes = useStyles();
  const containerClasses = useContainerStyles();
  const cardClasses = useCardStyles();
  const [tabIndex, setTabIndex] = useState(0);
  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setTabIndex(value);
  };
  const handleDownloadClick = useCallback(() => {
    download(bookActivities, "分析データ.csv");
  }, [bookActivities]);
  const learnerActivities = getLearnerActivities({
    learners,
    courseBooks,
    bookActivities,
  });
  const activitiesByBooks = getActivitiesByBooks({
    learners,
    courseBooks,
    bookActivities,
  });
  return (
    <Container classes={containerClasses} maxWidth="md">
      <ActionHeader
        title="学習分析"
        action={
          <>
            <Typography variant="h6">
              {session?.ltiLaunchBody.context_title}
            </Typography>
            <span className={classes.contextLabel}>
              {session?.ltiLaunchBody.context_label}
            </span>
            <Button
              onClick={handleDownloadClick}
              color="primary"
              variant="contained"
              size="small"
            >
              <GetAppOutlinedIcon fontSize="small" />
              分析データをダウンロード
            </Button>
          </>
        }
      />
      <Card classes={cardClasses} className={classes.card}>
        <Tabs
          className={classes.tabs}
          indicatorColor="primary"
          value={tabIndex}
          onChange={handleChange}
        >
          <Tab label="ブック" />
          <Tab label="学習者" />
        </Tabs>
        <TabPanel className={classes.items} value={tabIndex} index={0}>
          {activitiesByBooks.map((activitiesByBook, index) => (
            <LearningActivityItem
              key={index}
              totalLearnerCount={learners.length}
              activitiesByBook={activitiesByBook}
            />
          ))}
        </TabPanel>
        <TabPanel className={classes.learners} value={tabIndex} index={1}>
          <div className={classes.learnersLabel}>
            <div>
              <LearningStatusDot type="completed" />
              <span>完了</span>
            </div>
            <div>
              <LearningStatusDot type="incompleted" />
              <span>未完了</span>
            </div>
            <div>
              <LearningStatusDot type="unopened" />
              <span>未開封</span>
            </div>
          </div>
          {learnerActivities.map(([learner, activities], index) => (
            <LearnerActivityItem
              key={index}
              learner={learner}
              activities={activities}
            />
          ))}
        </TabPanel>
      </Card>
    </Container>
  );
}
