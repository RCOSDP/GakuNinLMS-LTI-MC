import schedule from "node-schedule";

import { ZOOM_IMPORT_INTERVAL } from "$server/utils/env";
import { validateSettings, logger } from "$server/utils/zoom/env";
import { zoomImport } from "$server/utils/zoom/import";

export async function setupZoomImportScheduler() {
  if (!validateSettings()) return;

  const job = schedule.scheduleJob(ZOOM_IMPORT_INTERVAL, async () => {
    job.cancel();
    logger("INFO", "begin zoom import...");

    try {
      await zoomImport();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      logger("ERROR", e.toString(), e);
    } finally {
      logger("INFO", "end zoom import...");
      job.reschedule(ZOOM_IMPORT_INTERVAL);
    }
  });
}
