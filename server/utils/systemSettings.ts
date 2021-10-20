import { validateSettings } from "$server/utils/zoom/import";

export function getSystemSettings() {
  return { zoomImportEnabled: validateSettings(false) };
}
