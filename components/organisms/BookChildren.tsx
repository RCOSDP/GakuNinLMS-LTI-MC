import { MouseEvent, Fragment, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Collapse from "@material-ui/core/Collapse";
import { ExpandLess, ExpandMore, EditOutlined } from "@material-ui/icons";
import { SectionSchema } from "$server/models/book/section";

type Props = {
  className?: string;
  sections: SectionSchema[];
  onItemClick(event: MouseEvent<HTMLElement>, index: [number, number]): void;
};

export default function BookChildren(props: Props) {
  const { className, sections, onItemClick } = props;
  const [open, setOpen] = useState<boolean[]>(sections.map(() => true));
  const handleItemClick = (event: MouseEvent<HTMLElement>) => {
    const { section, topic } = event.currentTarget.dataset;
    onItemClick(event, [section, topic].map(Number) as [number, number]);
  };
  const handleSectionClick = (sectionIndex: number) => {
    setOpen((open) => {
      const newOpen = open.slice();
      newOpen[sectionIndex] = !newOpen[sectionIndex];
      return newOpen;
    });
  };
  const handleEditClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
  };
  return (
    <List disablePadding className={className}>
      {sections.map((section, sectionIndex) => (
        <Fragment key={section.id}>
          {(section.name && (
            <>
              <ListItem button onClick={() => handleSectionClick(sectionIndex)}>
                <ListItemText>
                  {sectionIndex + 1} {section.name}
                </ListItemText>
                {open[sectionIndex] ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={open[sectionIndex]}>
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
                      {section.name && `.${topicIndex + 1}`} {topic.name}
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <IconButton color="primary" onClick={handleEditClick}>
                        <EditOutlined />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </Collapse>
            </>
          )) || (
            <>
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
                    {section.name && `.${topicIndex + 1}`} {topic.name}
                  </ListItemText>
                  <ListItemSecondaryAction>
                    <IconButton color="primary" onClick={handleEditClick}>
                      <EditOutlined />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </>
          )}
        </Fragment>
      ))}
    </List>
  );
}
