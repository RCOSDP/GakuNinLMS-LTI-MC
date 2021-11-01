import { NodeSSH } from "node-ssh";
import {
  WOWZA_SCP_HOST,
  WOWZA_SCP_PORT,
  WOWZA_SCP_USERNAME,
  WOWZA_SCP_PRIVATE_KEY,
  WOWZA_SCP_PASS_PHRASE,
  WOWZA_SCP_SERVER_PATH,
} from "$server/utils/env";

export async function scpUpload(uploadroot: string) {
  const client = new NodeSSH();
  try {
    await client.connect({
      host: WOWZA_SCP_HOST,
      port: WOWZA_SCP_PORT,
      username: WOWZA_SCP_USERNAME,
      privateKey: WOWZA_SCP_PRIVATE_KEY,
      passphrase: WOWZA_SCP_PASS_PHRASE,
    });
    let scpError;
    await client.putDirectory(uploadroot, WOWZA_SCP_SERVER_PATH, {
      tick: (localPath, remotePath, error) => {
        if (error) scpError = error;
      },
    });
    if (scpError) throw scpError;
  } finally {
    if (client.isConnected()) client.dispose();
  }
}
