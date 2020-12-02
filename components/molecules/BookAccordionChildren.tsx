import { MouseEvent, ComponentProps } from "react";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { Section } from "types/bookAccordion";

type Props = Omit<ComponentProps<typeof List>, "children"> & {
  sections: Section[];
};

export default function BookAccordionChildren(props: Props) {
  const { sections, ...other } = props;
  const handleEditClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
  };
  return (
    <List disablePadding {...other}>
      {sections.map((section, sectionIndex) => (
        <>
          {section.name && (
            <ListItem key={sectionIndex} button>
              <ListItemText>
                {sectionIndex + 1} {section.name}
              </ListItemText>
            </ListItem>
          )}
          {section.topics.map((topic, topicIndex) => (
            <ListItem key={topicIndex} button>
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
        </>
      ))}
    </List>
  );
}
