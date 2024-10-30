import {
  ApiErrorSchema,
  ValidateSessionResponseSchema,
} from "./models/api-models";
import { getJwt } from "./utils/auth-utils";

export async function validateSession(sessionId: string) {
  const token = await getJwt(sessionId);

  const res = await fetch(
    `${process.env.NEEDLE_URL}/api/v1/apps/sessions/validate`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (res.status > 400) {
    throw ApiErrorSchema.parse(await res.json()).error;
  }

  return ValidateSessionResponseSchema.parse(await res.json()).result;
}
