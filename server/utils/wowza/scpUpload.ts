import fs from "fs";
import scp from "node-scp";
import {
  WOWZA_SCP_HOST,
  WOWZA_SCP_PORT,
  WOWZA_SCP_USERNAME,
  WOWZA_SCP_PRIVATE_KEY,
  WOWZA_SCP_PASS_PHRASE,
  WOWZA_SCP_SERVER_PATH,
} from "$server/utils/env";

export async function scpUpload(uploadroot: string) {
  let client;
  try {
    // @ts-expect-error This expression is not callable.
    // Type 'typeof import("./node_modules/node-scp/lib/index")' has no call signatures
    client = await scp({
      host: WOWZA_SCP_HOST,
      port: WOWZA_SCP_PORT,
      username: WOWZA_SCP_USERNAME,
      privateKey: fs.readFileSync(WOWZA_SCP_PRIVATE_KEY),
      passphrase: WOWZA_SCP_PASS_PHRASE,
    });
    await client.uploadDir(uploadroot, WOWZA_SCP_SERVER_PATH);
  } finally {
    if (client) client.close();
  }
}
