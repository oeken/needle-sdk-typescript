import {
  type CreateConnectorRequest,
  ApiErrorSchema,
  ConnectorRunDescriptor,
  CreateConnectorResponseSchema,
  GetConnectorResponseSchema,
  ListConnectorsResponseSchema,
} from "./models/api-models";
import { getJwt } from "./utils/auth-utils";
import { getConfig } from "./utils/config-utils";

export async function createConnector(
  params: CreateConnectorRequest,
  sessionId: string,
) {
  const token = await getJwt(sessionId);

  const res = await fetch(`${process.env.NEEDLE_URL}/api/v1/apps/connectors`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(params),
  });

  if (res.status > 400) {
    throw ApiErrorSchema.parse(await res.json()).error;
  }

  return CreateConnectorResponseSchema.parse(await res.json()).result;
}

export async function getConnector(connectorId: string, sessionId: string) {
  const token = await getJwt(sessionId);

  const res = await fetch(
    `${process.env.NEEDLE_URL}/api/v1/apps/connectors/${connectorId}`,
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

  return GetConnectorResponseSchema.parse(await res.json()).result;
}

export async function listConnectors(sessionId: string) {
  const token = await getJwt(sessionId);

  const res = await fetch(`${process.env.NEEDLE_URL}/api/v1/apps/connectors`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status > 400) {
    throw ApiErrorSchema.parse(await res.json()).error;
  }

  return ListConnectorsResponseSchema.parse(await res.json()).result;
}

export async function deleteConnector(connectorId: string, sessionId: string) {
  const token = await getJwt(sessionId);

  const res = await fetch(
    `${process.env.NEEDLE_URL}/api/v1/apps/connectors/${connectorId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (res.status > 400) {
    throw ApiErrorSchema.parse(await res.json()).error;
  }
}

export async function publishConnectorRun(
  connectorId: string,
  descriptor: ConnectorRunDescriptor,
) {
  const cfg = await getConfig();
  const token = await getJwt(cfg.appId);

  const res = await fetch(
    `${process.env.NEEDLE_URL}/api/v1/apps/connectors/${connectorId}/runs`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(descriptor),
    },
  );

  if (res.status > 400) {
    throw ApiErrorSchema.parse(await res.json()).error;
  }
}
