import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Contents } from "./contents";
import { Video } from "./video";
import { PlayerProps, Player } from "./Player";
import { usePlayer } from "./VideoJs";

/**
 * playlist を順番に再生するコンポーネント
 */
export function ContentsPlayer(props: {
  contents: Contents;
  playlist: Video[];
}) {
  const [playerState, setPlayerState] = React.useState<
    {
      index: number; // NOTE: playlist index number
    } & PlayerProps
  >();
  React.useEffect(() => {
    if (props.playlist.length === 0) return;
    const index = 0;
    const { youtubeVideoId, subtitles } = props.playlist[index];
    setPlayerState({ index, youtubeVideoId, subtitles, autoplay: true });
  }, [setPlayerState, props.playlist]);
  const player = usePlayer();
  const endedHandler = React.useCallback(() => {
    setPlayerState((prev) => {
      if (!prev) return prev;
      const next = prev.index + 1;
      if (next < props.playlist.length) {
        return {
          index: next,
          ...props.playlist[next],
          autoplay: true,
        };
      } else {
        return prev;
      }
    });
  }, [setPlayerState, props.playlist]);
  React.useEffect(() => {
    if (!player) return;
    player.on("ended", endedHandler);
    return () => player.off("ended", endedHandler);
  }, [player, endedHandler]);

  const playlistClickHandler: (
    index: number
  ) => (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void = React.useCallback(
    (index: number) => {
      return () =>
        setPlayerState(
          (prev) => prev && { index, ...props.playlist[index], autoplay: true }
        );
    },
    [setPlayerState, props.playlist]
  );

  return (
    <>
      <Box my={2}>
        <Typography component="h2" variant="h5">
          {props.contents.title}
        </Typography>
      </Box>
      <Box my={2}>{playerState && <Player {...playerState} />}</Box>
      <Box my={2}>
        <Typography component="h3" variant="h6" style={{ marginBottom: 8 }}>
          {playerState && props.playlist[playerState.index].title}
        </Typography>
        <Typography>
          {playerState && props.playlist[playerState.index].description}
        </Typography>
      </Box>
      <Divider />
      <Box
        my={2}
        component="dl"
        display="grid"
        gridTemplateColumns="4rem 1fr"
        gridColumnGap="1rem"
      >
        <Typography component="dt">スキル</Typography>
        <Typography component="dd">
          {(playerState &&
            props.playlist[playerState.index].skills
              .filter(({ has }) => has)
              .map(({ name }) => name)
              .join(", ")) ||
            "-"}
        </Typography>
        <Typography component="dt">職種</Typography>
        <Typography component="dd">
          {(playerState &&
            props.playlist[playerState.index].tasks
              .filter(({ has }) => has)
              .map(({ name }) => name)
              .join(", ")) ||
            "-"}
        </Typography>
        <Typography component="dt">レベル</Typography>
        <Typography component="dd">
          {(playerState &&
            props.playlist[playerState.index].levels
              .filter(({ has }) => has)
              .map(({ name }) => name)
              .join(", ")) ||
            "-"}
        </Typography>
      </Box>
      <Divider />
      <List component="nav" aria-label="secondary mailbox folders">
        {props.playlist.map(({ id, title, description }, index) => (
          <ListItem
            key={index}
            button
            selected={playerState?.index === index}
            onClick={playlistClickHandler(index)}
          >
            <ListItemText
              primary={title}
              secondary={`#${id} : ${description}`}
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
}
