export default { title: "EditContents" };
import { EditContents } from "./EditContents";

export const Basic = () => {
  return (
    <EditContents
      contents={{
        id: 42,
        title: "Contents title",
        videos: [2, 5, 7, 9].map((id) => ({ id, title: `Sample video ${id}` })),
        state: "success",
      }}
      updateContents={() => {}}
    />
  );
};

export const Empty = () => (
  <EditContents
    contents={{
      id: 42,
      title: "",
      videos: [],
      state: "success",
    }}
    updateContents={() => {}}
  />
);
