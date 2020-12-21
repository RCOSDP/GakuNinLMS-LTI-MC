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
  onItemClick(event: MouseEvent<HTMLElement>, index: [number, number]): void;
};

export default function BookAccordionChildren(props: Props) {
  const { sections, onItemClick } = props;
  const handleItemClick = (event: MouseEvent<HTMLElement>) => {
    const { section, topic } = event.currentTarget.dataset;
    onItemClick(event, [section, topic].map(Number) as [number, number]);
  };
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
            <ListItem
              key={topic.id}
              button
              data-section={sectionIndex}
              data-topic={topicIndex}
              onClick={handleItemClick}
            >
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
