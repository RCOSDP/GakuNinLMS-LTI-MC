export default { title: "ContentsPlayer" };
import { ContentsPlayer } from "./ContentsPlayer";
import { Video } from "./video";

const playlist: Video[] = [
  {
    id: 2,
    title: "Sample Video 1",
    description: "Sample Description",
    youtubeVideoId: "Vj9xpvLolEY",
    subtitles: [{ lang: "en", file: new File([], "sample_file.vtt") }],
    skills: [1, 2, 3].map((id) => ({ id, has: id === 3, name: `skill ${id}` })),
    tasks: [1, 2, 3].map((id) => ({ id, has: id === 2, name: `task ${id}` })),
    levels: [1, 2, 3].map((id) => ({ id, has: id === 1, name: `level ${id}` })),
    state: "success",
  },
  {
    id: 5,
    title: "Sample Video 2",
    description: "Sample Description",
    youtubeVideoId: "3yfen-t49eI",
    subtitles: [{ lang: "en", file: new File([], "sample_file.vtt") }],
    skills: [1, 2, 3].map((id) => ({ id, has: id === 2, name: `skill ${id}` })),
    tasks: [1, 2, 3].map((id) => ({ id, has: id === 1, name: `task ${id}` })),
    levels: [1, 2, 3].map((id) => ({ id, has: id === 3, name: `level ${id}` })),
    state: "success",
  },
  {
    id: 7,
    title: "Sample Video 3",
    description: "Sample Description",
    youtubeVideoId: "JXvSvl1bvcY",
    subtitles: [{ lang: "en", file: new File([], "sample_file.vtt") }],
    skills: [1, 2, 3].map((id) => ({ id, has: id === 1, name: `skill ${id}` })),
    tasks: [1, 2, 3].map((id) => ({ id, has: id === 2, name: `task ${id}` })),
    levels: [1, 2, 3].map((id) => ({ id, has: id === 3, name: `level ${id}` })),
    state: "success",
  },
];

export const Basic = () => {
  return (
    <ContentsPlayer
      contents={{
        id: 42,
        title: "Contents title",
        videos: [],
        state: "success",
      }}
      playlist={playlist}
    />
  );
};

export const Empty = () => (
  <ContentsPlayer
    contents={{
      id: 42,
      title: "",
      videos: [],
      state: "success",
    }}
    playlist={playlist}
  />
);

export const ManyVideos = () => {
  return (
    <ContentsPlayer
      contents={{
        id: 42,
        title: "Contents title",
        videos: [],
        state: "success",
      }}
      playlist={playlist}
    />
  );
};
