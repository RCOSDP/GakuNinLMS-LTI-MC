import { useState } from "react";
import clsx from "clsx";
import { useTheme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LinkIcon from "@mui/icons-material/Link";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import EditButton from "$atoms/EditButton";
import SharedIndicator from "$atoms/SharedIndicator";
import DescriptionList from "$atoms/DescriptionList";
import Sections from "$organisms/Sections";
import TopicViewer from "$organisms/TopicViewer";
import ActionHeader from "$organisms/ActionHeader";
import BookInfo from "$organisms/BookInfo";
import CollapsibleContent from "$organisms/CollapsibleContent";
import type { BookSchema } from "$server/models/book";
import type { TopicSchema } from "$server/models/topic";
import { useSessionAtom } from "$store/session";
import useSticky from "$utils/useSticky";
import useAppBarOffset from "$utils/useAppBarOffset";
import getLocaleDateString from "$utils/getLocaleDateString";
import extractNumberFromPx from "$utils/extractNumberFromPx";
import sumPixels from "$utils/sumPixels";

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    alignItems: "baseline",
    margin: 0,
    width: "100%",
    "& > *": {
      marginRight: theme.spacing(1),
    },
    "& > $title ~ *": {
      flexShrink: 0,
    },
  },
  title: {
    fontSize: "1.75rem",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  icon: {
    marginRight: theme.spacing(0.5),
  },
  description: {
    display: "flex",
    alignItems: "baseline",
    "& > dl": {
      marginRight: theme.spacing(2),
    },
    "& > button": {
      fontSize: "0.75rem",
      flexShrink: 0,
    },
  },
  inner: {
    display: "grid",
    gap: theme.spacing(2),
    "&$desktop": {
      gridTemplateAreas: `
        "side main"
      `,
      gridTemplateColumns: "30% 1fr",
      gridAutoRows: "min-content",
    },
    "&$mobile": {
      gridTemplateAreas: `
        "main"
        "side"
      `,
    },
  },
  info: {
    marginBottom: theme.spacing(2),
  },
  main: {
    gridArea: "main",
    "&$desktop": {
      marginBottom: theme.spacing(2),
    },
  },
  side: {
    gridArea: "side",
    "&$mobile": {
      marginBottom: theme.spacing(2),
    },
  },
  scroll: ({ offset }: { offset: string }) => ({
    overflowY: "auto",
    height: `calc(100vh - ${offset})`,
  }),
  desktop: {},
  mobile: {},
}));

type Props = {
  linked?: boolean;
  book: BookSchema | null;
  index: ItemIndex;
  onBookEditClick?(book: BookSchema): void;
  onOtherBookLinkClick?(): void;
  onTopicEditClick?(topic: TopicSchema): void;
  onTopicEnded(): void;
  onItemClick(index: ItemIndex): void;
  considerAppBar?: boolean;
};

export default function Book(props: Props) {
  const {
    linked,
    book,
    index: [sectionIndex, topicIndex],
    onBookEditClick,
    onOtherBookLinkClick,
    onTopicEditClick,
    onTopicEnded,
    onItemClick,
    considerAppBar = true,
  } = props;
  const topic = book?.sections[sectionIndex]?.topics[topicIndex];
  const { isInstructor, isBookEditable, isTopicEditable } = useSessionAtom();
  const [expanded, setExpanded] = useState(false);
  const handleLinkClick = () => setExpanded(!expanded);
  const theme = useTheme();
  const trigger = useScrollTrigger({
    threshold: extractNumberFromPx(theme.spacing(4)),
    disableHysteresis: true,
  });
  const sideOffset = sumPixels(
    theme.spacing(2),
    trigger ? "0px" : theme.spacing(4)
  );
  const actionHeaderOffset = theme.spacing(4);
  const appBarOffset = useAppBarOffset();
  const offset = sumPixels(
    actionHeaderOffset,
    considerAppBar ? appBarOffset : "0px"
  );
  const classes = useStyles({
    offset: sumPixels(offset, sideOffset),
  });
  const sticky = useSticky({ offset });
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const handleBookEditClick = () => book && onBookEditClick?.(book);
  const handleOtherBookLinkClick = () => onOtherBookLinkClick?.();
  const handleItemClick = (index: ItemIndex) => onItemClick(index);
  const handleItemEditClick =
    isInstructor && onTopicEditClick
      ? ([sectionIndex, topicIndex]: ItemIndex) => {
          const topic = book?.sections[sectionIndex]?.topics[topicIndex];
          if (topic) onTopicEditClick?.(topic);
        }
      : undefined;

  return (
    <Container maxWidth="lg">
      <ActionHeader
        considerAppBar={considerAppBar}
        action={
          <header className={classes.header}>
            <Typography
              className={clsx(classes.title, { [classes.mobile]: !matches })}
              variant="h4"
            >
              {book?.name}
            </Typography>
            {book?.shared && <SharedIndicator />}
            {isInstructor &&
              book &&
              onBookEditClick &&
              (isBookEditable(book) || book.shared) && (
                <EditButton
                  variant="book"
                  size="medium"
                  onClick={handleBookEditClick}
                />
              )}
            {isInstructor && linked && onOtherBookLinkClick && (
              <Button
                size="small"
                color="primary"
                onClick={handleOtherBookLinkClick}
              >
                <LinkIcon className={classes.icon} />
                他のブックを提供
              </Button>
            )}
          </header>
        }
      />
      {book && (
        <>
          <div className={classes.description}>
            <DescriptionList
              nowrap
              value={[
                {
                  key: "作成日",
                  value: getLocaleDateString(book.createdAt, "ja"),
                },
                {
                  key: "更新日",
                  value: getLocaleDateString(book.updatedAt, "ja"),
                },
                {
                  key: "ブック作成者",
                  value: book.author.name,
                },
              ]}
            />
            <Link
              component="button"
              aria-expanded={expanded}
              aria-controls="book-info"
              onClick={handleLinkClick}
            >
              ブックの詳細
            </Link>
          </div>
          <CollapsibleContent expanded={expanded}>
            <BookInfo id="book-info" className={classes.info} book={book} />
          </CollapsibleContent>
        </>
      )}
      <div
        className={clsx(
          classes.inner,
          matches ? classes.desktop : classes.mobile
        )}
      >
        <div className={clsx(classes.main, { [classes.desktop]: matches })}>
          {topic && (
            <TopicViewer topic={topic} onEnded={onTopicEnded} offset={offset} />
          )}
        </div>
        <div
          className={clsx(
            classes.side,
            matches ? classes.scroll : classes.mobile,
            sticky
          )}
        >
          <Sections
            index={[sectionIndex, topicIndex]}
            sections={book?.sections ?? []}
            onItemClick={handleItemClick}
            onItemEditClick={handleItemEditClick}
            isTopicEditable={isTopicEditable}
          />
        </div>
      </div>
    </Container>
  );
}
