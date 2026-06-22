import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
  type Over,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";
import useDebouncedCallback from "$utils/useDebouncedCallback";
import AddIcon from "@mui/icons-material/Add";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import makeStyles from "@mui/styles/makeStyles";
import RemoveButton from "$atoms/RemoveButton";
import SectionTextField from "$atoms/SectionTextField";
import type { SectionSchema } from "$server/models/book/section";
import type { TopicSchema } from "$server/models/topic";
import { gray, primary } from "$theme/colors";
import reorder, { insert, update, remove } from "$utils/reorder";

type SectionDragData = {
  type: "section";
  sectionId: number;
};

type TopicDragData = {
  type: "topic";
  sectionId: number;
  topicId: number;
};

type SectionTopicsDragData = {
  type: "section-topics";
  sectionId: number;
};

type DragData = SectionDragData | TopicDragData | SectionTopicsDragData;

function sectionSortableId(sectionId: number) {
  return `section-${sectionId}`;
}

function topicSortableId(sectionId: number, topicId: number) {
  return `topic-${sectionId}-${topicId}`;
}

function sectionDroppableId(sectionId: number) {
  return `droppable-${sectionId}`;
}

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
    position: "relative",
    padding: theme.spacing(2, 1),
    marginLeft: 25,
    marginBottom: theme.spacing(2),
    backgroundColor: gray[50],
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1],
    "&:hover": {
      backgroundColor: gray[200],
    },
    "&:hover > $tab": {
      backgroundColor: gray[200],
    },
    "&:hover > [data-section-topics]:not(:hover) ~ $tab > $icon": {
      color: gray[700],
    },
  },
  icon: {
    color: gray[500],
  },
  tab: {
    display: "flex",
    alignItems: "center",
    position: "absolute",
    transform: "translateY(-50%)",
    top: "50%",
    left: -25,
    width: 25,
    height: "50%",
    minHeight: 50,
    border: `2px solid ${gray[200]}`,
    borderRight: "none",
    borderRadius: `4px 0 0 4px`,
    backgroundColor: gray[50],
    paddingLeft: theme.spacing(0.25),
  },
  drag: {
    backgroundColor: gray[200],
    "& $tab": {
      backgroundColor: gray[200],
      "& > $icon": {
        color: gray[700],
      },
    },
  },
}));

type DraggableSectionProps = {
  section: SectionSchema;
  children: React.ReactNode;
  onSectionUpdate(section: SectionSchema): void;
};

function SortableSection({
  section,
  children,
  onSectionUpdate,
}: DraggableSectionProps) {
  const classes = useDraggableSectionStyles();
  const id = sectionSortableId(section.id);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    data: { type: "section", sectionId: section.id } satisfies SectionDragData,
  });
  const handleSectionNameChange = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onSectionUpdate({ ...section, name: event.target.value || null });
    },
    500
  );
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={clsx(classes.root, {
        [classes.drag]: isDragging,
      })}
      {...attributes}
      {...listeners}
    >
      {section.topics.length > 1 && (
        <SectionTextField
          label="セクション"
          fullWidth
          onChange={handleSectionNameChange}
          disabled={isDragging}
          defaultValue={section.name}
        />
      )}
      {children}
      <div className={classes.tab}>
        <DragIndicatorIcon className={classes.icon} fontSize="small" />
      </div>
    </div>
  );
}

function SectionTopicsDroppable({
  section,
  children,
}: Omit<DraggableSectionProps, "onSectionUpdate">) {
  const { setNodeRef } = useDroppable({
    id: sectionDroppableId(section.id),
    data: {
      type: "section-topics",
      sectionId: section.id,
    } satisfies SectionTopicsDragData,
  });
  return (
    <div ref={setNodeRef} data-section-topics>
      {children}
    </div>
  );
}

function DragDropSection({
  section,
  children,
  onSectionUpdate,
}: DraggableSectionProps) {
  const topicIds = section.topics.map((topic) =>
    topicSortableId(section.id, topic.id)
  );
  return (
    <SortableSection section={section} onSectionUpdate={onSectionUpdate}>
      <SectionTopicsDroppable section={section}>
        <SortableContext
          items={topicIds}
          strategy={verticalListSortingStrategy}
        >
          {children}
        </SortableContext>
      </SectionTopicsDroppable>
    </SortableSection>
  );
}

const useDraggableTopicStyles = makeStyles((theme) => ({
  root: {
    padding: `${theme.spacing(1)} 0`,
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
    "& $icon": {
      color: gray[700],
    },
  },
}));

type DraggableTopicProps = {
  section: SectionSchema;
  topic: TopicSchema;
  onTopicRemove(topicSortableId: string): void;
};

function SortableTopic({ section, topic, onTopicRemove }: DraggableTopicProps) {
  const classes = useDraggableTopicStyles();
  const id = topicSortableId(section.id, topic.id);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    data: {
      type: "topic",
      sectionId: section.id,
      topicId: topic.id,
    } satisfies TopicDragData,
  });
  const handleTopicRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onTopicRemove(id);
  };
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={clsx(classes.root, {
        [classes.drag]: isDragging,
      })}
      {...attributes}
      {...listeners}
    >
      <DragIndicatorIcon className={classes.icon} fontSize="small" />
      {topic.name}
      <RemoveButton variant="topic" onClick={handleTopicRemove} />
    </div>
  );
}

type DragEndHandler = (
  sections: SectionSchema[],
  index: { start: number; end: number },
  sectionId: { start: number; end: number }
) => SectionSchema[];

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
    const topics = reorder<TopicSchema>(
      sections[sectionIndex.start].topics,
      index.start,
      index.end
    );
    sections[sectionIndex.end] = {
      ...sections[sectionIndex.end],
      topics,
    };
  } else {
    const topics = {
      start: remove(sections[sectionIndex.start].topics, index.start),
      end: insert(
        sections[sectionIndex.end].topics,
        index.end,
        sections[sectionIndex.start].topics[index.start]
      ),
    };
    sections[sectionIndex.start] = {
      ...sections[sectionIndex.start],
      topics: topics.start,
    };
    sections[sectionIndex.end] = {
      ...sections[sectionIndex.end],
      topics: topics.end,
    };

    // NOTE: SectionTextFieldが非表示のときセクションは無名として同期
    if (topics.start.length === 1) {
      sections[sectionIndex.start].name = null;
    }
  }

  return sections;
};

const updateSection = (
  initialSections: SectionSchema[],
  section: SectionSchema
): SectionSchema[] => {
  const index = initialSections.findIndex(({ id }) => id === section.id);
  const sections = update(initialSections, index, section);
  return sections;
};

const removeTopic = (
  initialSections: SectionSchema[],
  topicId: string
): SectionSchema[] => {
  const match = topicId.match(/^topic-(\d+)-(\d+)$/);
  if (!match) return initialSections;
  const sectionId = Number(match[1]);
  const topicNumericId = Number(match[2]);
  const sections = [...initialSections];
  const sectionIndex = sections.findIndex(({ id }) => id === sectionId);
  if (sectionIndex === -1) return initialSections;
  const topicIndex = sections[sectionIndex].topics.findIndex(
    ({ id }) => id === topicNumericId
  );
  if (topicIndex === -1) return initialSections;
  const topics = remove(sections[sectionIndex].topics, topicIndex);
  sections[sectionIndex] = {
    ...sections[sectionIndex],
    topics,
  };
  return sections;
};

const removeSection = (
  initialSections: SectionSchema[],
  index: number
): SectionSchema[] => {
  const sections = remove(initialSections, index);
  return sections;
};

function getTopicDropTarget(
  sections: SectionSchema[],
  over: Over | null
): { sectionId: number; index: number } | null {
  if (!over) return null;
  const data = over.data.current as DragData | undefined;
  if (data?.type === "topic") {
    const section = sections.find(({ id }) => id === data.sectionId);
    if (!section) return null;
    const index = section.topics.findIndex(({ id }) => id === data.topicId);
    if (index === -1) return null;
    return { sectionId: data.sectionId, index };
  }
  if (data?.type === "section-topics") {
    const section = sections.find(({ id }) => id === data.sectionId);
    if (!section) return null;
    return { sectionId: data.sectionId, index: section.topics.length };
  }
  return null;
}

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

export default function DraggableSections(props: Props) {
  const { sections, onSectionsUpdate, onSectionCreate } = props;
  const classes = useStyles();
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const sectionIds = sections.map(({ id }) => sectionSortableId(id));
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const activeData = active.data.current as DragData | undefined;
    const overData = over.data.current as DragData | undefined;
    if (activeData?.type === "section" && overData?.type === "section") {
      const startIndex = sections.findIndex(
        ({ id }) => id === activeData.sectionId
      );
      const endIndex = sections.findIndex(
        ({ id }) => id === overData.sectionId
      );
      if (startIndex === -1 || endIndex === -1) return;
      onSectionsUpdate(
        handleSectionDragEnd(
          sections,
          { start: startIndex, end: endIndex },
          { start: activeData.sectionId, end: overData.sectionId }
        )
      );
      return;
    }
    if (activeData?.type !== "topic") return;
    const sourceSection = sections.find(
      ({ id }) => id === activeData.sectionId
    );
    if (!sourceSection) return;
    const sourceIndex = sourceSection.topics.findIndex(
      ({ id }) => id === activeData.topicId
    );
    if (sourceIndex === -1) return;
    const destination = getTopicDropTarget(sections, over);
    if (!destination) return;
    onSectionsUpdate(
      handleTopicDragEnd(
        sections,
        { start: sourceIndex, end: destination.index },
        { start: activeData.sectionId, end: destination.sectionId }
      )
    );
  };
  const handleSectionUpdate = (section: SectionSchema) => {
    onSectionsUpdate(updateSection(sections, section));
  };
  const handleTopicRemove = (topicId: string) => {
    onSectionsUpdate(removeTopic(sections, topicId));
  };
  const handleSectionRemove = (index: number) => () => {
    onSectionsUpdate(removeSection(sections, index));
  };
  const handleSectionCreate = () => onSectionCreate();
  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={sectionIds}
          strategy={verticalListSortingStrategy}
        >
          {sections.map((section, sectionIndex) => (
            <DragDropSection
              key={`${section.id}`}
              section={section}
              onSectionUpdate={handleSectionUpdate}
            >
              {section.topics.map((topic) => (
                <SortableTopic
                  key={topicSortableId(section.id, topic.id)}
                  section={section}
                  topic={topic}
                  onTopicRemove={handleTopicRemove}
                />
              ))}
              {section.topics.length === 0 && (
                <p className={classes.placeholder}>
                  ここにトピックをドロップ
                  <RemoveButton
                    variant="section"
                    onClick={handleSectionRemove(sectionIndex)}
                  />
                </p>
              )}
            </DragDropSection>
          ))}
        </SortableContext>
      </DndContext>
      <SectionCreateButton onClick={handleSectionCreate} />
    </>
  );
}
