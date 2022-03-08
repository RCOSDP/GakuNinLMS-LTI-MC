import type { ActivityScope } from "$types/activityScope";
import ActivityScopeSelect from "./ActivityScopeSelect";

const defaultScope: ActivityScope = "topic";

export default {
  title: "molecules/ActivityScopeSelect",
  component: ActivityScopeSelect,
  args: { defaultValue: defaultScope },
};

export const Default = ActivityScopeSelect.bind({});
