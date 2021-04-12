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
import LearningStatusDot from "$atoms/LearningStatusDot";
import useContainerStyles from "$styles/container";
import useCardStyles from "$styles/card";
import useSelectorProps from "$utils/useSelectorProps";
import type { BookLearningActivitySchema } from "$server/models/bookLearningActivity";
import { gray } from "$theme/colors";
import { SessionSchema } from "$server/models/session";

type TabPanelProps = {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
};

function TabPanel({ children, value, index, ...other }: TabPanelProps) {
  return (
    <div
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
  const [value, setValue] = useState(0);
  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setValue(value);
  };
  const bookLearningActivitiesMenu = useSelectorProps<BookLearningActivitySchema>(
    bookLearningActivities[0]
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
          aria-controls="book-menu"
          variant="text"
          onClick={bookLearningActivitiesMenu.onOpen}
          disabled={value === 0}
        >
          <ExpandMoreIcon />
          <Typography variant="h5">
            {bookLearningActivitiesMenu?.value.name}
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
        id="book-menu"
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
          value={value}
          onChange={handleChange}
        >
          <Tab label="ブック" />
          <Tab label="トピック" />
          <Tab label="ユーザー" />
        </Tabs>
        <TabPanel value={value} index={0}>
          {bookLearningActivities.map((bookLearningActivity, index) => (
            <LearningActivityItem
              key={index}
              learningActivity={bookLearningActivity}
            />
          ))}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {bookLearningActivitiesMenu.value.topicLearningActivities.map(
            (topicLearningActivity, index) => (
              <LearningActivityItem
                key={index}
                learningActivity={topicLearningActivity}
              />
            )
          )}
        </TabPanel>
        <TabPanel value={value} index={2}>
          <div>
            <LearningStatusDot type="completed" />
            <span>完了</span>
            <LearningStatusDot type="incompleted" />
            <span>未完了</span>
            <LearningStatusDot type="unopened" />
            <span>未開封</span>
          </div>
          {bookLearningActivitiesMenu.value.learnerActivities.map(
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
