import { validateSettings } from "$server/utils/zoom/env";

export function getSystemSettings() {
  return { zoomImportEnabled: validateSettings(false) };
}
