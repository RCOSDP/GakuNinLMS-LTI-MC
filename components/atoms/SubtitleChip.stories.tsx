export default { title: "atoms/SubtitleChip" };

import SubtitleChip from "./SubtitleChip";
import { resource } from "$samples";

const {
  tracks: [videoTrack],
} = resource;

export const Default = () => (
  <SubtitleChip videoTrack={videoTrack} onDelete={console.log} />
);
