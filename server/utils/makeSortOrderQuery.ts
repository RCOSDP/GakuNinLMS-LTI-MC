import sortOrder from "$server/models/sortOrder";

function makeSortOrderQuery(sort: string) {
  switch (sortOrder.find((order) => order === sort)) {
    default:
    case "updated":
      return { updatedAt: "desc" as const };
    case "reverse-updated":
      return { updatedAt: "asc" as const };
    case "created":
      return { createdAt: "desc" as const };
    case "reverse-created":
      return { createdAt: "asc" as const };
    case "name":
      return { name: "asc" as const };
    case "reverse-name":
      return { name: "desc" as const };
  }
}

export default makeSortOrderQuery;
