import type { Stream } from "node:stream";
import fs from "node:fs";
import stream from "node:stream/promises";
import path from "node:path";
import { startWowzaUpload } from "$server/utils/wowza/upload";

/**
 * Wowzaサーバーへのアップロードの実行
 * @return 成功時: アップロードされた動画URL
 */
async function wowzaUpload(
  ltiConsumerId: string,
  userId: number,
  fileName: string,
  file: Stream,
  wowzaBaseUrl: string
) {
  let tmpdir;
  let wowzaUpload;
  try {
    tmpdir = await fs.promises.mkdtemp("/tmp/topic-wowza-upload-");
    const fullpath = `${tmpdir}/${path.basename(fileName)}`;
    const fileStream = file.pipe(fs.createWriteStream(fullpath));
    await stream.finished(fileStream);
    wowzaUpload = await startWowzaUpload(ltiConsumerId, userId);
    const uploadpath = await wowzaUpload.moveFileToUpload(fullpath, new Date());
    await wowzaUpload.upload();
    return `${wowzaBaseUrl}${uploadpath}`;
  } catch (e) {
    throw new Error(`サーバーにアップロードできませんでした。\n${e}`);
  } finally {
    if (wowzaUpload) await wowzaUpload.cleanUp();
    if (tmpdir) await fs.promises.rm(tmpdir, { recursive: true });
  }
}

export default wowzaUpload;
