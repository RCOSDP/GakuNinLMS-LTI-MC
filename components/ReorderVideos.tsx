import {
  DragDropContext,
  DropResult,
  Droppable,
  Draggable,
} from "react-beautiful-dnd";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DragHandleIcon from "@material-ui/icons/DragHandle";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import { Menu, MenuItems } from "./Menu";
import {
  usePopupState,
  bindTrigger,
  PopupState,
} from "material-ui-popup-state/hooks";
import { useRouter } from "./router";

export function ReorderVideos(props: {
  videos: Array<{ id: number; title: string }>;
  onVideoDragEnd: (source: number, destination: number) => void;
  onEditVideo: (index: number) => void;
  onDeleteVideo: (index: number) => void;
}) {
  function onDragEnd({ source, destination }: DropResult) {
    if (!destination) return;
    if (source === destination) return;
    props.onVideoDragEnd(source.index, destination.index);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="ReorderVideos">
        {(provided) => (
          <List ref={provided.innerRef} {...provided.droppableProps}>
            {props.videos.map((video, index) => (
              <DraggableVideo
                index={index}
                draggableId={`${index}#${video.id}`}
                key={`${index}#${video.id}`}
                video={video}
                onEditVideo={props.onEditVideo}
                onDeleteVideo={props.onDeleteVideo}
              />
            ))}
            {provided.placeholder}
          </List>
        )}
      </Droppable>
    </DragDropContext>
  );
}

function DraggableVideo(props: {
  index: number;
  draggableId: string;
  video: { id: number; title: string };
  onEditVideo: (index: number) => void;
  onDeleteVideo: (index: number) => void;
}) {
  const popupState = usePopupState({
    variant: "popover",
    popupId: "DraggableVideoMenu",
  });

  return (
    <Draggable draggableId={props.draggableId} index={props.index}>
      {(provided) => (
        <ListItem ref={provided.innerRef} {...provided.draggableProps} selected>
          <ListItemIcon {...provided.dragHandleProps}>
            <DragHandleIcon />
          </ListItemIcon>
          <ListItemText
            primary={props.video.title}
            secondary={`#${props.video.id}`}
          />
          <ListItemSecondaryAction {...bindTrigger(popupState)}>
            <IconButton edge="end" aria-label="more">
              <MoreVertIcon />
            </IconButton>
          </ListItemSecondaryAction>
          {/* FIXME: Warning: Failed prop type: Material-UI */}
          <VideoMoreMenu
            popupState={popupState}
            video={props.video}
            onTitleEdit={() => {
              props.onEditVideo(props.index);
            }}
            onDelete={() => {
              props.onDeleteVideo(props.index);
            }}
          />
        </ListItem>
      )}
    </Draggable>
  );
}

function VideoMoreMenu(props: {
  popupState: PopupState;
  video: { id: number };
  onDelete: () => void;
  onTitleEdit: () => void;
}) {
  const router = useRouter();
  const menuItems: MenuItems = [
    {
      label: "確認する",
      icon: <PlayArrowIcon />,
      onClick() {
        router.push({
          pathname: "/videos",
          query: {
            id: props.video.id,
            action: "edit",
          },
        });
      },
    },
    {
      label: "タイトルを変更する",
      icon: <EditIcon />,
      onClick() {
        props.onTitleEdit();
      },
    },
    {
      label: "取り除く",
      icon: <CloseIcon />,
      onClick() {
        props.onDelete();
      },
    },
  ];
  return <Menu popupState={props.popupState} items={menuItems} />;
}
