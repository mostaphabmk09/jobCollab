import type {
  CollaborationOpportunity,
  Step1Payload,
  Step2Payload,
  Step4Payload,
} from "./types";

const API_BASE_URL = "http://localhost:5000";

type JsonValue = Record<string, unknown> | Array<unknown> | undefined;

async function request<T>(
  path: string,
  accessToken: string,
  init: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      ...(init.headers ?? {}),
    },
    credentials: "include",
  });

  const text = await response.text();
  const data = text ? (JSON.parse(text) as Record<string, unknown>) : null;

  if (!response.ok) {
    const message =
      (typeof data?.message === "string" && data.message) ||
      (Array.isArray(data?.message) ? data.message.join(", ") : null) ||
      "Request failed";
    throw new Error(message);
  }

  return data as T;
}

function patch<T>(path: string, accessToken: string, payload?: JsonValue) {
  return request<T>(path, accessToken, {
    method: "PATCH",
    body: JSON.stringify(payload ?? {}),
  });
}

export function createCollaborationOpportunityDraft(accessToken: string) {
  return request<CollaborationOpportunity>(
    "/collaboration-opportunities",
    accessToken,
    {
      method: "POST",
      body: JSON.stringify({}),
    },
  );
}

export function getCollaborationOpportunity(id: string, accessToken: string) {
  return request<CollaborationOpportunity>(
    `/collaboration-opportunities/${id}`,
    accessToken,
  );
}

export function getCollaborationOpportunityPreview(
  id: string,
  accessToken: string,
) {
  return request<CollaborationOpportunity>(
    `/collaboration-opportunities/${id}/preview`,
    accessToken,
  );
}

export function listMyCollaborationOpportunities(accessToken: string) {
  return request<CollaborationOpportunity[]>(
    "/me/collaboration-opportunities",
    accessToken,
  );
}

export function updateCollaborationOpportunityStep1(
  id: string,
  accessToken: string,
  payload: Step1Payload,
) {
  return patch<CollaborationOpportunity>(
    `/collaboration-opportunities/${id}/step-1`,
    accessToken,
    payload,
  );
}

export function updateCollaborationOpportunityStep2(
  id: string,
  accessToken: string,
  payload: Step2Payload,
) {
  return patch<CollaborationOpportunity>(
    `/collaboration-opportunities/${id}/step-2`,
    accessToken,
    payload,
  );
}

export function updateCollaborationOpportunityStep4(
  id: string,
  accessToken: string,
  payload: Step4Payload,
) {
  return patch<CollaborationOpportunity>(
    `/collaboration-opportunities/${id}/step-4`,
    accessToken,
    payload,
  );
}

export function publishCollaborationOpportunity(
  id: string,
  accessToken: string,
) {
  return patch<CollaborationOpportunity>(
    `/collaboration-opportunities/${id}/publish`,
    accessToken,
  );
}
