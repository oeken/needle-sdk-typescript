import {
  ApiErrorSchema,
  ListCollectionsResponseSchema,
} from "./models/api-models";
import { getJwt } from "./utils/auth-utils";

export async function listCollections(sessionId: string) {
  const token = await getJwt(sessionId);

  const res = await fetch(`${process.env.NEEDLE_URL}/api/v1/apps/collections`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status > 400) {
    throw ApiErrorSchema.parse(await res.json()).error;
  }

  return ListCollectionsResponseSchema.parse(await res.json()).result;
}
