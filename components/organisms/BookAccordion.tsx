import { MouseEvent } from "react";
import { format } from "date-fns";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { makeStyles } from "@material-ui/core/styles";
import BookAccordionChildren from "$molecules/BookAccordionChildren";
import CourseChip from "$atoms/CourseChip";
import Item from "$atoms/Item";
import { Book, Topic } from "types/books";
import useAccordionStyle from "styles/accordion";
import useAccordionSummaryStyle from "styles/accordionSummary";
import useAccordionDetailStyle from "styles/accordionDetail";

const useStyles = makeStyles((theme) => ({
  chips: {
    padding: theme.spacing(0, 2),
    "& > *": {
      marginRight: theme.spacing(1.75),
      marginBottom: theme.spacing(1),
    },
  },
  items: {
    padding: theme.spacing(0, 2),
    "& > *": {
      display: "inline-block",
      marginRight: theme.spacing(1.75),
      marginBottom: theme.spacing(1),
    },
  },
}));

type Props = Book & {
  onTopicClick(topic: Topic): void;
};

export default function BookAccordion(props: Props) {
  const { name, author, createdAt, updatedAt, sections, onTopicClick } = props;
  const classes = useStyles();
  const accordionClasses = useAccordionStyle();
  const accordionSummaryClasses = useAccordionSummaryStyle();
  const accordionDetailClasses = useAccordionDetailStyle();
  const handleItemClick = (
    _: never,
    [sectionIndex, topicIndex]: [number, number]
  ) => onTopicClick(sections[sectionIndex].topics[topicIndex]);
  const handleInfoClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
  };
  const handleEditClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
  };
  const handleChipClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };
  return (
    <Accordion classes={accordionClasses}>
      <AccordionSummary
        classes={accordionSummaryClasses}
        IconButtonProps={{ edge: "start" }}
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography variant="h6">{name}</Typography>
        <IconButton onClick={handleInfoClick}>
          <InfoOutlinedIcon />
        </IconButton>
        <IconButton color="primary" onClick={handleEditClick}>
          <EditOutlinedIcon />
        </IconButton>
      </AccordionSummary>
      <AccordionDetails classes={accordionDetailClasses}>
        <div className={classes.chips}>
          <CourseChip
            courseId="R30023001"
            courseName="2020年度　〇〇コース"
            onClick={handleChipClick}
          />
        </div>
        <div className={classes.items}>
          <Item itemKey="作成日" value={format(createdAt, "yyyy.MM.dd")} />
          <Item itemKey="更新日" value={format(updatedAt, "yyyy.MM.dd")} />
          <Item itemKey="著者" value={author.name} />
        </div>
        <Divider />
        <BookAccordionChildren
          sections={sections}
          onItemClick={handleItemClick}
        />
      </AccordionDetails>
    </Accordion>
  );
}
