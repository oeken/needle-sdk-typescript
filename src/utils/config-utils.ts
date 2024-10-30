import { lilconfig } from "lilconfig";
import {
  type NeedleAppConfig,
  NeedleAppConfigSchema,
} from "../models/config-models";

let config: NeedleAppConfig | null = null;

const options = {
  searchPlaces: ["needle.config.js"],
};

export async function getConfig() {
  if (config) {
    return config;
  }
  const res = await lilconfig("needle-config", options).search();
  config = NeedleAppConfigSchema.parse(res?.config);
  return config;
}
