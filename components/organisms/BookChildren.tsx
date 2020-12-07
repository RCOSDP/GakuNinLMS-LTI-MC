import { MouseEvent, Fragment } from "react";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { Section } from "types/book";

type Props = {
  sections: Section[];
};

export default function BookChildren(props: Props) {
  const { sections } = props;
  const handleEditClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
  };
  return (
    <List disablePadding>
      {sections.map((section, sectionIndex) => (
        <Fragment key={section.id}>
          {section.name && (
            <ListItem button>
              <ListItemText>
                {sectionIndex + 1} {section.name}
              </ListItemText>
            </ListItem>
          )}
          {section.topics.map((topic, topicIndex) => (
            <ListItem key={topic.id} button>
              <ListItemText>
                {sectionIndex + 1}
                {section.name ? `.${topicIndex + 1}` : ""} {topic.name}
              </ListItemText>
              <ListItemSecondaryAction>
                <IconButton color="primary" onClick={handleEditClick}>
                  <EditOutlinedIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </Fragment>
      ))}
    </List>
  );
}
