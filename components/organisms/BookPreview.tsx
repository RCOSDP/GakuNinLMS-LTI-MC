import { Fragment, useState } from "react";
import { format } from "date-fns";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CheckBoxOutlineBlonkIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { makeStyles } from "@material-ui/core/styles";
import Video from "$organisms/Video";
import CourseChip from "$atoms/CourseChip";
import Item from "$atoms/Item";
import useCardStyle from "styles/card";
import { Book, Topic } from "$types/book";
import { primary } from "theme/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  left: {
    flex: 1,
  },
  right: {
    flexShrink: 0,
    width: "30%",
  },
  title: {
    display: "flex",
    alignItems: "center",
  },
  checkBox: {
    marginLeft: theme.spacing(-2),
  },
  chips: {
    "& > *": {
      marginRight: theme.spacing(1.75),
      marginBottom: theme.spacing(1),
    },
  },
  items: {
    "& > *": {
      display: "inline-block",
      marginRight: theme.spacing(1.75),
      marginBottom: theme.spacing(1),
    },
  },
  selected: {
    backgroundColor: primary[50],
  },
}));

type Props = { book: Book };

export default function BookPreview(props: Props) {
  const cardClasses = useCardStyle();
  const classes = useStyles();
  const { book } = props;
  const [checkBox, setCheckBox] = useState(false);
  const [topic] = useState<Topic>(book.sections[0].topics[0]);
  const handleCheckBoxClick = () => {
    setCheckBox(!checkBox);
  };
  return (
    <Card
      classes={cardClasses}
      className={`${classes.root} ${checkBox ? classes.selected : ""}`}
    >
      <div className={classes.left}>
        <Typography variant="h6" className={classes.title}>
          <IconButton
            className={classes.checkBox}
            color="primary"
            onClick={handleCheckBoxClick}
          >
            {checkBox ? <CheckBoxOutlinedIcon /> : <CheckBoxOutlineBlonkIcon />}
          </IconButton>
          {book.name}
          <IconButton color="primary">
            <EditOutlinedIcon />
          </IconButton>
        </Typography>
        <div className={classes.chips}>
          {book.ltiResourceLinks.map((ltiResourceLink) => (
            <CourseChip
              key={ltiResourceLink.contextId}
              ltiResourceLink={ltiResourceLink}
            />
          ))}
        </div>
        <div className={classes.items}>
          <Item itemKey="作成日" value={format(book.createdAt, "yyyy.MM.dd")} />
          <Item itemKey="更新日" value={format(book.updatedAt, "yyyy.MM.dd")} />
          <Item itemKey="著者" value={book.author.name} />
        </div>
        {book.sections.map((section, sectionIndex) => (
          <Fragment key={section.id}>
            {section.name && (
              <p>
                {sectionIndex + 1} {section.name}
              </p>
            )}
            {section.topics.map((topic, topicIndex) => (
              <p key={topic.id}>
                {sectionIndex + 1}
                {section.name ? `.${topicIndex + 1}` : ""} {topic.name}
              </p>
            ))}
          </Fragment>
        ))}
        <Button size="small" color="primary">
          もっと詳しく...
        </Button>
      </div>
      <div className={classes.right}>
        <Video
          providerUrl="https://www.youtube.com/"
          url={topic.resource.url}
          subtitles={[]}
        />
      </div>
    </Card>
  );
}
