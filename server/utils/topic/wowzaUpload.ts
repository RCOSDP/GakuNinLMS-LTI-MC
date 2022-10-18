import fs from "fs";
import path from "path";
import { Buffer } from "buffer";

import { startWowzaUpload } from "$server/utils/wowza/upload";

async function wowzaUpload(
  ltiConsumerId: string,
  userId: number,
  fileName: string,
  fileContent: string,
  wowzaBaseUrl: string
) {
  let tmpdir;
  let wowzaUpload;
  try {
    tmpdir = await fs.promises.mkdtemp("/tmp/topic-wowza-upload-");
    const fullpath = `${tmpdir}/${path.basename(fileName)}`;
    await fs.promises.writeFile(
      fullpath,
      Buffer.from(fileContent as string, "base64")
    );

    wowzaUpload = await startWowzaUpload(ltiConsumerId, userId);
    const uploadpath = await wowzaUpload.moveFileToUpload(fullpath, new Date());
    await wowzaUpload.upload();
    return `${wowzaBaseUrl}${uploadpath}`;
  } catch (e) {
    throw new Error(`サーバーにアップロードできませんでした。\n${e}`);
  } finally {
    if (wowzaUpload) await wowzaUpload.cleanUp();
    if (tmpdir) await fs.promises.rmdir(tmpdir, { recursive: true });
  }
}

export default wowzaUpload;
