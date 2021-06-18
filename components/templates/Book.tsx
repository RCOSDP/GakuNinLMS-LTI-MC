import clsx from "clsx";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import LinkIcon from "@material-ui/icons/Link";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import EditButton from "$atoms/EditButton";
import SharedIndicator from "$atoms/SharedIndicator";
import DescriptionList from "$atoms/DescriptionList";
import BookChildren from "$organisms/BookChildren";
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

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    alignItems: "baseline",
    width: "100%",
    "& > *": {
      marginRight: theme.spacing(1),
    },
    "&$mobile": {
      fontSize: "1.75rem",
      alignItems: "center",
    },
    "& > $title ~ *": {
      flexShrink: 0,
    },
  },
  title: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  icon: {
    marginRight: theme.spacing(0.5),
  },
  inner: {
    display: "grid",
    gap: `${theme.spacing(2)}px`,
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
    margin: theme.spacing(2, 0),
  },
  main: {
    gridArea: "main",
    "&$desktop": {
      marginBottom: theme.spacing(2),
    },
  },
  side: {
    gridArea: "side",
    "&$desktop": {
      marginTop: theme.spacing(2),
    },
    "&$mobile": {
      marginBottom: theme.spacing(2),
    },
  },
  scroll: ({ offset }: { offset: number }) => ({
    overflowY: "auto",
    height: `calc(100vh - ${offset}px)`,
  }),
  desktop: {},
  mobile: {},
}));

type Props = {
  linked?: boolean;
  book: BookSchema | null;
  index: ItemIndex;
  onBookEditClick?(book: BookSchema): void;
  onBookLinkClick?(book: BookSchema): void;
  onOtherBookLinkClick(): void;
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
    onBookLinkClick,
    onOtherBookLinkClick,
    onTopicEditClick,
    onTopicEnded,
    onItemClick,
    considerAppBar = true,
  } = props;
  const topic = book?.sections[sectionIndex]?.topics[topicIndex];
  const { isInstructor, isBookEditable, isTopicEditable } = useSessionAtom();
  const descriptionListOffset = 22;
  const collapsibleContentOffset = 36.5;
  const theme = useTheme();
  const trigger = useScrollTrigger({
    threshold:
      theme.spacing(4) + descriptionListOffset + collapsibleContentOffset,
    disableHysteresis: true,
  });
  const sideOffset =
    theme.spacing(2) +
    (trigger
      ? 0
      : theme.spacing(4) + descriptionListOffset + collapsibleContentOffset);
  const actionHeaderOffset = 80;
  const appBarOffset = useAppBarOffset();
  const offset = (considerAppBar ? appBarOffset : 0) + actionHeaderOffset;
  const classes = useStyles({
    offset: offset + sideOffset,
  });
  const sticky = useSticky({ offset });
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const handleBookEditClick = () => book && onBookEditClick?.(book);
  const handleBookLinkClick = () => book && onBookLinkClick?.(book);
  const handleOtherBookLinkClick = () => onOtherBookLinkClick();
  const handleItemClick = (_: never, index: ItemIndex) => {
    onItemClick(index);
  };
  const handleItemEditClick =
    isInstructor && onTopicEditClick
      ? (_: never, [sectionIndex, topicIndex]: ItemIndex) => {
          const topic = book?.sections[sectionIndex]?.topics[topicIndex];
          if (topic) onTopicEditClick?.(topic);
        }
      : undefined;

  return (
    <Container maxWidth="lg">
      <ActionHeader
        considerAppBar={considerAppBar}
        action={
          <Typography
            className={clsx(classes.header, { [classes.mobile]: !matches })}
            variant="h4"
            gutterBottom={true}
          >
            <span className={classes.title}>{book?.name}</span>
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
            {isInstructor && !linked && onBookLinkClick && (
              <Button
                size="small"
                color="primary"
                onClick={handleBookLinkClick}
              >
                <LinkIcon className={classes.icon} />
                このブックを提供
              </Button>
            )}
            {isInstructor && linked && (
              <Button
                size="small"
                color="primary"
                onClick={handleOtherBookLinkClick}
              >
                <LinkIcon className={classes.icon} />
                他のブックを提供
              </Button>
            )}
            {/* TODO: 「このブックを提供解除」ボタンの実装 */}
          </Typography>
        }
      />
      {book && (
        <>
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
          <CollapsibleContent expanded={false} label="ブック詳細">
            <BookInfo className={classes.info} book={book} />
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
            matches ? classes.desktop : classes.mobile,
            { [classes.scroll]: matches },
            sticky
          )}
        >
          <BookChildren
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
