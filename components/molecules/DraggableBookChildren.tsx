import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import type { DraggableId, DropResult } from "react-beautiful-dnd";
import clsx from "clsx";
import { useDebouncedCallback } from "use-debounce";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import { makeStyles } from "@material-ui/core/styles";
import SectionTextField from "$atoms/SectionTextField";
import { SectionSchema } from "$server/models/book/section";
import { TopicSchema } from "$server/models/topic";
import { gray, primary } from "$theme/colors";

const useSectionCreateButtonStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    borderRadius: theme.shape.borderRadius,
    borderColor: primary[500],
    borderStyle: "dotted",
    backgroundColor: primary[50],
    padding: theme.spacing(2),
    width: "100%",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: primary[100],
    },
  },
}));

type SectionCreateButtonProps = React.HTMLAttributes<HTMLButtonElement>;

function SectionCreateButton(props: SectionCreateButtonProps) {
  const classes = useSectionCreateButtonStyles();
  return (
    <button className={classes.root} {...props}>
      <AddIcon htmlColor={primary[500]} />
      新しいセクション
    </button>
  );
}

const useDraggableSectionStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    backgroundColor: gray[50],
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1],
    "&:hover": {
      backgroundColor: gray[200],
    },
  },
  drag: {
    backgroundColor: gray[200],
  },
}));

type DraggableSectionProps = {
  section: SectionSchema;
  children: React.ReactNode;
  index: number;
  onSectionUpdate(section: SectionSchema): void;
};

function DraggableSection({
  section,
  index,
  children,
  onSectionUpdate,
}: DraggableSectionProps) {
  const classes = useDraggableSectionStyles();
  const draggableId = `draggable-${section.id}`;
  const handleSectionNameChange = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onSectionUpdate({ ...section, name: event.target.value || null });
    },
    500
  ).callback;
  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided, snapshot) => (
        <div
          className={clsx(classes.root, {
            [classes.drag]: snapshot.isDragging,
          })}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <SectionTextField
            label="セクション"
            fullWidth
            onChange={handleSectionNameChange}
            disabled={snapshot.isDragging}
            defaultValue={section.name}
          />
          {children}
        </div>
      )}
    </Draggable>
  );
}

function DroppableSection({
  section,
  children,
}: Omit<DraggableSectionProps, "index" | "onSectionUpdate">) {
  const droppableId = `droppable-${section.id}`;
  return (
    <Droppable droppableId={droppableId} type="topic">
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {children}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

function DragDropSection({
  section,
  index,
  children,
  onSectionUpdate,
}: DraggableSectionProps) {
  return (
    <DraggableSection
      section={section}
      index={index}
      onSectionUpdate={onSectionUpdate}
    >
      <DroppableSection section={section}>{children}</DroppableSection>
    </DraggableSection>
  );
}

const useDraggableTopicStyles = makeStyles((theme) => ({
  root: {
    padding: `${theme.spacing(1)}px 0`,
    display: "flex",
    alignItems: "center",
    "&:hover $icon": {
      color: gray[700],
    },
  },
  icon: {
    color: gray[500],
  },
  drag: {
    backgroundColor: gray[200],
  },
}));

type DraggableTopicProps = Omit<
  DraggableSectionProps,
  "children" | "onSectionUpdate"
> & {
  topic: TopicSchema;
  onTopicRemove(draggableId: DraggableId): void;
};

function DraggableTopic({
  section,
  topic,
  index,
  onTopicRemove,
}: DraggableTopicProps) {
  const classes = useDraggableTopicStyles();
  const draggableId = `draggable-${section.id}-${topic.id}:${index}`;
  const handleTopicRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onTopicRemove(draggableId);
  };
  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided, snapshot) => (
        <div
          className={clsx(classes.root, {
            [classes.drag]: snapshot.isDragging,
          })}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <DragIndicatorIcon className={classes.icon} fontSize="small" />
          {topic.name}
          <Tooltip title="このトピックを取り除く">
            <IconButton
              size="small"
              color="primary"
              onClick={handleTopicRemove}
            >
              <RemoveIcon />
            </IconButton>
          </Tooltip>
        </div>
      )}
    </Draggable>
  );
}

type DragEndHandler = (
  sections: SectionSchema[],
  index: { start: number; end: number },
  sectionId: { start: number; end: number }
) => SectionSchema[];

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

const handleSectionDragEnd: DragEndHandler = (sections, index) => {
  return reorder<SectionSchema>(sections, index.start, index.end);
};

const handleTopicDragEnd: DragEndHandler = (
  initialSections,
  index,
  sectionId
) => {
  const sections = [...initialSections];
  const sectionIndex = {
    start: sections.findIndex(({ id }) => id === sectionId.start),
    end: sections.findIndex(({ id }) => id === sectionId.end),
  };
  if (sectionId.start === sectionId.end) {
    const updated = reorder<TopicSchema>(
      sections[sectionIndex.start].topics,
      index.start,
      index.end
    );
    sections[sectionIndex.end].topics = updated;
  } else {
    sections[sectionIndex.end].topics.splice(
      index.end,
      0,
      sections[sectionIndex.start].topics[index.start]
    );
    sections[sectionIndex.start].topics.splice(index.start, 1);
  }

  return sections;
};

const updateSection = (
  initialSections: SectionSchema[],
  section: SectionSchema
): SectionSchema[] => {
  const sections = [...initialSections];
  const index = sections.findIndex(({ id }) => id === section.id);
  sections.splice(index, 1, section);
  return sections;
};

const removeTopic = (
  initialSections: SectionSchema[],
  draggableTopicId: DraggableId
): SectionSchema[] => {
  const sections = [...initialSections];
  const sectionIndex = sections.findIndex(
    ({ id }) => id === Number(draggableTopicId.split("-")[1])
  );
  const topicIndex = Number(draggableTopicId.split(":")[1]);
  sections[sectionIndex].topics.splice(topicIndex, 1);
  return sections;
};

const useStyles = makeStyles((theme) => ({
  placeholder: {
    margin: theme.spacing(1),
    color: gray[700],
  },
}));

type Props = {
  sections: SectionSchema[];
  onSectionsUpdate(sections: SectionSchema[]): void;
  onSectionCreate(): void;
};

export default function DraggableBookChildren(props: Props) {
  const { sections, onSectionsUpdate, onSectionCreate } = props;
  const classes = useStyles();
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const handler: {
      [key: string]: DragEndHandler;
    } = {
      section: handleSectionDragEnd,
      topic: handleTopicDragEnd,
    } as const;
    onSectionsUpdate(
      handler[result.type](
        sections,
        { start: result.source.index, end: result.destination.index },
        {
          start: Number(result.draggableId.split("-")[1]),
          end: Number(result.destination.droppableId.split("-")[1]),
        }
      )
    );
  };
  const handleSectionUpdate = (section: SectionSchema) => {
    onSectionsUpdate(updateSection(sections, section));
  };
  const handleTopicRemove = (draggableId: DraggableId) => {
    onSectionsUpdate(removeTopic(sections, draggableId));
  };
  const handleSectionCreate = () => onSectionCreate();
  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable-book-children" type="section">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {sections.map((section, sectionIndex) => (
                <DragDropSection
                  key={`${section.id}`}
                  section={section}
                  index={sectionIndex}
                  onSectionUpdate={handleSectionUpdate}
                >
                  {section.topics.map((topic, topicIndex) => (
                    <DraggableTopic
                      key={`${section.id}-${topic.id}:${topicIndex}`}
                      section={section}
                      topic={topic}
                      index={topicIndex}
                      onTopicRemove={handleTopicRemove}
                    />
                  ))}
                  {section.topics.length === 0 && (
                    <p className={classes.placeholder}>
                      ここにトピックをドロップ
                    </p>
                  )}
                </DragDropSection>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <SectionCreateButton onClick={handleSectionCreate} />
    </>
  );
}
