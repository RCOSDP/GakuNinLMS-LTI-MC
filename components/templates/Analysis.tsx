import { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";
import GetAppOutlinedIcon from "@material-ui/icons/GetAppOutlined";
import { makeStyles } from "@material-ui/core/styles";
import ActionHeader from "$organisms/ActionHeader";
import AnalysisOverviewItem from "$molecules/AnalysisOverviewItem";
import AnalysisDetailItem from "$molecules/AnalysisDetailItem";
import LearningStatusDot from "$atoms/LearningStatusDot";
import useContainerStyles from "$styles/container";
import useCardStyles from "$styles/card";
// import { useSessionAtom } from "$store/session";
import useSelectorProps from "$utils/useSelectorProps";
import type { BookSchema } from "$server/models/book";
import type { AnalysisOverview } from "$server/models/analysisOverview";
import type { AnalysisDetail } from "$server/models/analysisDetail";
import type { LtiResourceLinkProps } from "$server/models/ltiResourceLink";
import { gray } from "$theme/colors";

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

type LtiResource = Omit<LtiResourceLinkProps, "authorId" | "bookId">;

type Props = {
  books: BookSchema[];
  ltiResources: LtiResource[];
  analysisBooks: AnalysisOverview[];
  analysisTopics: AnalysisOverview[];
  analysisUsers: AnalysisDetail[];
  onAnalysisBookDownload?(): void;
  onLtiResourceClick?(ltiResource: LtiResource): void;
  onBookClick?(book: BookSchema): void;
};

export default function Analysis(props: Props) {
  const {
    books,
    ltiResources,
    analysisBooks,
    analysisTopics,
    analysisUsers,
    onAnalysisBookDownload,
    onLtiResourceClick,
    onBookClick,
  } = props;
  // const { session } = useSessionAtom();
  const classes = useStyles();
  const containerClasses = useContainerStyles();
  const cardClasses = useCardStyles();
  const [value, setValue] = useState(0);
  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setValue(value);
  };
  const ltiResourceMenu = useSelectorProps<LtiResource>(ltiResources[0]);
  const bookMenu = useSelectorProps<BookSchema>(books[0]);
  const handleLtiResourceClick = (ltiResource: LtiResource) => {
    onLtiResourceClick?.(ltiResource);
    ltiResourceMenu.setValue(ltiResource);
    ltiResourceMenu.onClose();
  };
  const handleBookClick = (book: BookSchema) => {
    onBookClick?.(book);
    bookMenu.setValue(book);
    bookMenu.onClose();
  };
  return (
    <Container classes={containerClasses} maxWidth="md">
      <ActionHeader
        title="学習分析"
        action={
          <>
            <Typography variant="h6">
              {ltiResourceMenu?.value?.contextTitle}
            </Typography>
            <span className={classes.contextLabel}>
              {ltiResourceMenu?.value?.contextLabel}
            </span>
            <Tooltip title="他のコースを選択">
              <IconButton
                aria-controls="lti-resource-menu"
                size="small"
                onClick={ltiResourceMenu.onOpen}
              >
                <UnfoldMoreIcon />
              </IconButton>
            </Tooltip>
          </>
        }
      />
      <Menu
        id="lti-resource-menu"
        aria-haspopup="true"
        anchorEl={ltiResourceMenu.anchorEl}
        open={Boolean(ltiResourceMenu.anchorEl)}
        onClose={ltiResourceMenu.onClose}
      >
        {ltiResources.map((ltiResource, index) => (
          <MenuItem
            key={index}
            onClick={() => handleLtiResourceClick(ltiResource)}
          >
            {ltiResource.contextTitle}
          </MenuItem>
        ))}
      </Menu>
      <div className={classes.action}>
        <Button
          aria-controls="book-menu"
          variant="text"
          onClick={bookMenu.onOpen}
        >
          <ExpandMoreIcon />
          <Typography variant="h5">{bookMenu?.value?.name}</Typography>
        </Button>
        <Button
          onClick={onAnalysisBookDownload}
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
        anchorEl={bookMenu.anchorEl}
        open={Boolean(bookMenu.anchorEl)}
        onClose={bookMenu.onClose}
      >
        {books.map((book, index) => (
          <MenuItem key={index} onClick={() => handleBookClick(book)}>
            {book.name}
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
          {analysisBooks.map((analysisOverview, index) => (
            <AnalysisOverviewItem
              key={index}
              analysisOverview={analysisOverview}
            />
          ))}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {analysisTopics.map((analysisOverview, index) => (
            <AnalysisOverviewItem
              key={index}
              analysisOverview={analysisOverview}
            />
          ))}
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
          {analysisUsers.map((analysisDetail, index) => (
            <AnalysisDetailItem key={index} analysisDetail={analysisDetail} />
          ))}
        </TabPanel>
      </Card>
    </Container>
  );
}
