import { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import GetAppOutlinedIcon from "@material-ui/icons/GetAppOutlined";
import { makeStyles } from "@material-ui/core/styles";
import ActionHeader from "$organisms/ActionHeader";
import LearningActivityItem from "$molecules/LearningActivityItem";
import LearnerActivityItem from "$molecules/LearnerActivityItem";
import LearningStatusItems from "$molecules/LearningStatusItems";
import useContainerStyles from "$styles/container";
import useCardStyles from "$styles/card";
import useSelectorProps from "$utils/useSelectorProps";
import type { BookLearningActivitySchema } from "$server/models/bookLearningActivity";
import { gray } from "$theme/colors";
import { SessionSchema } from "$server/models/session";

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
  action: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: theme.spacing(2),
    "& > :not(:last-child)": {
      marginRight: theme.spacing(1),
    },
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
    marginLeft: "11rem",
  },
}));

type Props = {
  session: SessionSchema;
  bookLearningActivities: BookLearningActivitySchema[];
  onBookLearningActivitiesDownload?(): void;
};

export default function Dashboard(props: Props) {
  const {
    session,
    bookLearningActivities,
    onBookLearningActivitiesDownload,
  } = props;
  const classes = useStyles();
  const containerClasses = useContainerStyles();
  const cardClasses = useCardStyles();
  const [tabIndex, setTabIndex] = useState(0);
  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setTabIndex(value);
  };
  const bookLearningActivitiesMenu = useSelectorProps<BookLearningActivitySchema>(
    bookLearningActivities.length > 0 ? bookLearningActivities[0] : null
  );
  const handleBookLearningActivityClick = (
    bookLearningActivity: BookLearningActivitySchema
  ) => () => {
    bookLearningActivitiesMenu.onSelect(bookLearningActivity);
  };
  return (
    <Container classes={containerClasses} maxWidth="md">
      <ActionHeader
        title="学習分析"
        action={
          <>
            <Typography variant="h6">
              {session?.ltiResourceLink?.contextTitle}
            </Typography>
            <span className={classes.contextLabel}>
              {session?.ltiResourceLink?.contextLabel}
            </span>
          </>
        }
      />
      <div className={classes.action}>
        <Button
          aria-controls="book-learning-acitivities-menu"
          variant="text"
          onClick={bookLearningActivitiesMenu.onOpen}
          disabled={tabIndex === 0 || bookLearningActivities.length === 0}
        >
          <ExpandMoreIcon />
          <Typography variant="h5">
            {bookLearningActivitiesMenu.value?.name ?? ""}
          </Typography>
        </Button>
        <Button
          onClick={onBookLearningActivitiesDownload}
          color="primary"
          variant="contained"
          size="small"
        >
          <GetAppOutlinedIcon fontSize="small" />
          分析データをダウンロード
        </Button>
      </div>
      <Menu
        id="book-learning-activities-menu"
        aria-haspopup="true"
        anchorEl={bookLearningActivitiesMenu.anchorEl}
        open={Boolean(bookLearningActivitiesMenu.anchorEl)}
        onClose={bookLearningActivitiesMenu.onClose}
      >
        {bookLearningActivities.map((bookLearningActivity, index) => (
          <MenuItem
            key={index}
            onClick={handleBookLearningActivityClick(bookLearningActivity)}
          >
            {bookLearningActivity.name}
          </MenuItem>
        ))}
      </Menu>
      <Card classes={cardClasses} className={classes.card}>
        <Tabs
          className={classes.tabs}
          indicatorColor="primary"
          value={tabIndex}
          onChange={handleChange}
        >
          <Tab label="ブック" />
          <Tab label="トピック" />
          <Tab label="学習者" />
        </Tabs>
        <TabPanel className={classes.items} value={tabIndex} index={0}>
          {bookLearningActivities.map((bookLearningActivity, index) => (
            <LearningActivityItem
              key={index}
              learningActivity={bookLearningActivity}
              learnerActivities={
                bookLearningActivitiesMenu.value?.learnerActivities ?? []
              }
            />
          ))}
        </TabPanel>
        <TabPanel className={classes.items} value={tabIndex} index={1}>
          {bookLearningActivitiesMenu.value &&
            bookLearningActivitiesMenu.value.topicLearningActivities.map(
              (topicLearningActivity, index) => (
                <LearningActivityItem
                  key={index}
                  learningActivity={topicLearningActivity}
                  learnerActivities={
                    bookLearningActivitiesMenu.value?.learnerActivities ?? []
                  }
                />
              )
            )}
        </TabPanel>
        <TabPanel className={classes.learners} value={tabIndex} index={2}>
          <LearningStatusItems className={classes.learnersLabel} />
          {bookLearningActivitiesMenu.value &&
            bookLearningActivitiesMenu.value.learnerActivities.map(
              (learnerActivity, index) => (
                <LearnerActivityItem
                  key={index}
                  learnerActivity={learnerActivity}
                />
              )
            )}
        </TabPanel>
      </Card>
    </Container>
  );
}
