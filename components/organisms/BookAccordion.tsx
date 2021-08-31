import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { makeStyles } from "@material-ui/core/styles";
import EditButton from "$atoms/EditButton";
import CourseChip from "$atoms/CourseChip";
import SharedIndicator from "$atoms/SharedIndicator";
import DescriptionList from "$atoms/DescriptionList";
import BookChildrenTree from "$molecules/BookChildrenTree";
import { BookSchema } from "$server/models/book";
import { TopicSchema } from "$server/models/topic";
import { LtiResourceLinkSchema } from "$server/models/ltiResourceLink";
import useAccordionStyle from "styles/accordion";
import useAccordionSummaryStyle from "styles/accordionSummary";
import useAccordionDetailStyle from "styles/accordionDetail";
import getLocaleDateString from "$utils/getLocaleDateString";

const useStyles = makeStyles((theme) => ({
  shared: {
    margin: theme.spacing(0, 1),
  },
  chips: {
    padding: theme.spacing(0, 2),
    "& > *": {
      marginRight: theme.spacing(1.75),
      marginBottom: theme.spacing(1),
    },
  },
  items: {
    padding: theme.spacing(0, 2),
  },
  tree: {
    margin: theme.spacing(2),
    marginBottom: 0,
  },
}));

type Props = {
  book: BookSchema;
  onEditClick?(book: BookSchema): void;
  onTopicClick?(topic: TopicSchema): void;
  onTopicEditClick?(topic: TopicSchema): void;
  onLtiContextClick?(
    ltiResourceLink: Pick<LtiResourceLinkSchema, "consumerId" | "contextId">
  ): void;
  isTopicEditable?(topic: TopicSchema): boolean | undefined;
};

export default function BookAccordion(props: Props) {
  const {
    book,
    onEditClick,
    onTopicClick,
    onTopicEditClick,
    onLtiContextClick,
    isTopicEditable,
  } = props;
  const classes = useStyles();
  const accordionClasses = useAccordionStyle();
  const accordionSummaryClasses = useAccordionSummaryStyle();
  const accordionDetailClasses = useAccordionDetailStyle();
  const handleItem =
    (handler?: (topic: TopicSchema) => void) =>
    ([sectionIndex, topicIndex]: ItemIndex) =>
      handler?.(book.sections[sectionIndex].topics[topicIndex]);
  const handleEditClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onEditClick?.(book);
  };
  return (
    <Accordion classes={accordionClasses}>
      <AccordionSummary
        classes={accordionSummaryClasses}
        IconButtonProps={{ edge: "start" }}
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography variant="h6">{book.name}</Typography>
        {book.shared && <SharedIndicator className={classes.shared} />}
        {onEditClick && (
          <EditButton variant="book" size="medium" onClick={handleEditClick} />
        )}
      </AccordionSummary>
      <AccordionDetails classes={accordionDetailClasses}>
        <div className={classes.chips}>
          {book.ltiResourceLinks.map((ltiResourceLink, index) => (
            <CourseChip
              key={index}
              ltiResourceLink={ltiResourceLink}
              onLtiResourceLinkClick={onLtiContextClick}
            />
          ))}
        </div>
        <DescriptionList
          className={classes.items}
          inline
          value={[
            { key: "作成日", value: getLocaleDateString(book.createdAt, "ja") },
            { key: "更新日", value: getLocaleDateString(book.updatedAt, "ja") },
            { key: "作成者", value: book.author.name },
          ]}
        />
        <Divider />
        <TreeView
          className={classes.tree}
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
        >
          <BookChildrenTree
            sections={book.sections}
            onItemClick={handleItem(onTopicClick)}
            onItemEditClick={handleItem(onTopicEditClick)}
            isTopicEditable={isTopicEditable}
          />
        </TreeView>
      </AccordionDetails>
    </Accordion>
  );
}
