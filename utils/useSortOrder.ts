import { useState } from "react";
import { SortOrder } from "$server/models/sortOrder";

const useSortOrder = () => useState<SortOrder>("updated");

export default useSortOrder;
