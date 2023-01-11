import fs from "node:fs/promises";
import childProcess from "node:child_process";
import util from "node:util";
import { WowzaUpload } from "$server/utils/wowza/upload";

const exec = util.promisify(childProcess.exec);

/** WowzaUpload 大きいサイズのアップロードのテスト (環境変数での設定必須) */
async function wowzaUploadTest() {
  const root = await fs.mkdtemp("/tmp/wowza-upload-");
  await exec(`fallocate -l 10GB ${root}/dummy`);
  const wowzaUpload = new WowzaUpload(root, "dummy");
  await wowzaUpload.upload();
  await exec(`rm -r ${root}`);
  console.log("pass");
}

void wowzaUploadTest();
