export default { title: "atoms/AuthorFilter" };

import AuthorFilter from "./AuthorFilter";

export const Default = () => <AuthorFilter onFilterChange={console.log} />;

export const Disabled = () => (
  <AuthorFilter onFilterChange={console.log} disabled />
);
