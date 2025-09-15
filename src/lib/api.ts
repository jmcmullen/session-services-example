import type {
  Event,
  SearchEventsParams,
  SearchEventsResponse,
  TenantConfig,
} from "./types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.session.services";
const TENANT_ID =
  process.env.NEXT_PUBLIC_TENANT_ID || "ten_01hk153x00en6tvgwwwhn8xj1p";

async function fetchAPI<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "x-tenant-id": TENANT_ID,
    },
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(
      `API call failed: ${response.status} ${response.statusText}`,
    );
  }

  return response.json();
}

// https://api.session.services/docs#tag/events/get/events
export async function getEvents(
  params?: SearchEventsParams,
): Promise<SearchEventsResponse> {
  const searchParams = new URLSearchParams();

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });
  }

  const queryString = searchParams.toString();
  const url = `/events${queryString ? `?${queryString}` : ""}`;

  return fetchAPI<SearchEventsResponse>(url);
}

// https://api.session.services/docs#tag/events/get/events/{identifier}
export async function getEvent(identifier: string): Promise<Event> {
  const response = await fetchAPI<{ event: Event }>(`/events/${identifier}`);
  return response.event;
}

// https://api.session.services/docs#tag/tenant/get/tenant/config
export async function getTenantConfig(): Promise<TenantConfig> {
  return fetchAPI<TenantConfig>("/tenant/config");
}
