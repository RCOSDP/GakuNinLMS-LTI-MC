import { useState } from "react";
import type { SortOrder } from "$server/models/sortOrder";

const useSortOrder = () => useState<SortOrder>("updated");

export default useSortOrder;
