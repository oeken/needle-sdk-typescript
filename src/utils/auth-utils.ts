import jwt from "jsonwebtoken";
import { getConfig } from "./config-utils";

export async function getJwt(sub: string) {
  if (!process.env.NEEDLE_APP_SECRET) {
    throw new Error("NEEDLE_APP_SECRET is not set");
  }
  const cfg = await getConfig();

  const payload = {
    iss: cfg.appId,
    sub,
    aud: process.env.NEEDLE_URL,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 1 day
    jti: uuid(),
    appName: cfg.appName,
  };

  return jwt.sign(payload, process.env.NEEDLE_APP_SECRET);
}

export async function verifyJwt(token: string) {
  if (!process.env.NEEDLE_APP_SECRET) {
    throw new Error("NEEDLE_APP_SECRET is not set");
  }

  const verifiedToken = jwt.verify(token, process.env.NEEDLE_APP_SECRET);
  if (typeof verifiedToken === "string") {
    throw new Error("Invalid bearer token");
  }

  return verifiedToken;
}

export function uuid() {
  let dt = new Date().getTime();
  const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      const r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    },
  );
  return uuid;
}
