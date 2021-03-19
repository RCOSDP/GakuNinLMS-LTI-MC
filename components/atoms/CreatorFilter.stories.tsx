export default { title: "atoms/CreatorFilter" };

import CreatorFilter from "./CreatorFilter";

export const Default = () => <CreatorFilter onFilterChange={console.log} />;

export const Disabled = () => (
  <CreatorFilter onFilterChange={console.log} disabled />
);
