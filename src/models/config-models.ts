import { z } from "zod";

export const NeedleAppConfigSchema = z.object({
  appId: z.string(),
  appName: z.string(),
  appSlug: z.string(),
  connectorType: z.string(),
  connectorLogo: z.union([z.string().url().nullish(), z.literal("")]),
});

export type NeedleAppConfig = z.infer<typeof NeedleAppConfigSchema>;
