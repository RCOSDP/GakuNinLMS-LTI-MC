import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import type { DropResult } from "react-beautiful-dnd";
import clsx from "clsx";
import AddIcon from "@material-ui/icons/Add";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import { makeStyles } from "@material-ui/core/styles";
import SectionTextField from "$atoms/SectionTextField";
import { SectionSchema } from "$server/models/book/section";
import { TopicSchema } from "$server/models/topic";
import { gray, primary } from "$theme/colors";

const useCreateSectionButtonStyles = makeStyles((theme) => ({
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

type CreateSectionButtonProps = React.HTMLAttributes<HTMLButtonElement>;

function CreateSectionButton(props: CreateSectionButtonProps) {
  const classes = useCreateSectionButtonStyles();
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
};

function DraggableSection({ section, index, children }: DraggableSectionProps) {
  const classes = useDraggableSectionStyles();
  return (
    <Draggable draggableId={`draggable-${section.id}`} index={index}>
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
}: Omit<DraggableSectionProps, "index">) {
  return (
    <Droppable droppableId={`droppable-${section.id}`} type="topic">
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {children}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

function DragDropSection({ section, index, children }: DraggableSectionProps) {
  return (
    <DraggableSection section={section} index={index}>
      <DroppableSection section={section}>{children}</DroppableSection>
    </DraggableSection>
  );
}

const useDraggableTopicStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    paddingLeft: 0,
    display: "flex",
    alignItems: "center",
  },
  drag: {
    backgroundColor: gray[200],
  },
}));

type DraggableTopicProps = Omit<DraggableSectionProps, "children"> & {
  topic: TopicSchema;
};

function DraggableTopic({ section, topic, index }: DraggableTopicProps) {
  const classes = useDraggableTopicStyles();
  return (
    <Draggable
      draggableId={`draggable-${section.id}-${topic.id}:${index}`}
      index={index}
    >
      {(provided, snapshot) => (
        <div
          className={clsx(classes.root, {
            [classes.drag]: snapshot.isDragging,
          })}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <DragIndicatorIcon htmlColor={gray[700]} fontSize="small" />
          {topic.name}
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
                >
                  {section.topics.map((topic, topicIndex) => (
                    <DraggableTopic
                      key={`${section.id}-${topic.id}:${topicIndex}`}
                      section={section}
                      topic={topic}
                      index={topicIndex}
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
      <CreateSectionButton onClick={handleSectionCreate} />
    </>
  );
}
