import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import type { DropResult } from "react-beautiful-dnd";
import { makeStyles } from "@material-ui/core/styles";
import { SectionSchema } from "$server/models/book/section";
import { TopicSchema } from "$server/models/topic";
import { gray, primary } from "$theme/colors";

const useDraggableSectionStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    border: `${gray[500]} 1px solid`,
    marginBottom: theme.spacing(2),
    backgroundColor: gray[50],
  },
  title: {
    color: primary[500],
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
      {(provided) => (
        <div
          className={classes.root}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <span className={classes.title}>{section.name}</span>
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

type DraggableTopicProps = Omit<DraggableSectionProps, "children"> & {
  topic: TopicSchema;
};

function DraggableTopic({ section, topic, index }: DraggableTopicProps) {
  return (
    <Draggable
      draggableId={`draggable-${section.id}-${topic.id}:${index}`}
      index={index}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
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

type Props = {
  sections: SectionSchema[];
  onSectionsUpdate(sections: SectionSchema[]): void;
  onSectionCreate(): void;
};

export default function DraggableBookChildren(props: Props) {
  const { sections, onSectionsUpdate, onSectionCreate } = props;
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
                </DragDropSection>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <button onClick={handleSectionCreate}>新しいセクション</button>
    </>
  );
}
