export default { title: "organisms/AppBar" };

import AppBar from "./AppBar";
import { session } from "$samples";

export const Default = () => (
  <AppBar
    position="static"
    session={session}
    onBooksClick={console.log}
    onTopicsClick={console.log}
    onDashboardClick={console.log}
    onBookClick={console.log}
  />
);

export const Empty = () => <AppBar position="static" session={session} />;
