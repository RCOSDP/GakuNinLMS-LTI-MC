import sortLinkOrder from "$server/models/sortLinkOrder";

function makeSortLinkOrderQuery(sort: string) {
  switch (sortLinkOrder.find((order) => order === sort)) {
    default:
    case "updated":
      return { updatedAt: "desc" as const };
    case "reverse-updated":
      return { updatedAt: "asc" as const };
    case "created":
      return { createdAt: "desc" as const };
    case "reverse-created":
      return { createdAt: "asc" as const };
    case "title":
      return { title: "asc" as const };
    case "reverse-title":
      return { title: "desc" as const };
  }
}

export default makeSortLinkOrderQuery;
