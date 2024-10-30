import { ulid } from "ulid";

export function createNeedleFileId() {
  return "fle_" + ulid();
}
