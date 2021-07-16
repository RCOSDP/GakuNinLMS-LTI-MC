import { readFileSync } from "fs";

function fileExists(path: string) {
  try {
    return readFileSync(path);
  } catch {
    return;
  }
}

export default fileExists;
