export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface EventImages {
  mobile: ImageAsset;
  desktop: ImageAsset;
}

export interface EventLocation {
  name: string;
  address: string;
  city?: string;
  state?: string;
  postcode?: string;
  country: string;
  latitude: number;
  longitude: number;
  timeZone: string;
  images?: ImageAsset[];
}

export type EventApproval = "PENDING" | "APPROVED" | "REJECTED";
export type EventStatus = "UPCOMING" | "ACTIVE" | "ENDED" | "CANCELLED";
export type EventVisibility = "PUBLIC" | "PRIVATE" | "SCHEDULED" | "PASSWORD";

export interface Event {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  name: string;
  slug?: string;
  description?: string;
  approval?: EventApproval;
  status?: EventStatus;
  visibility?: EventVisibility;
  currency?: string;
  url?: string;
  entryStartsAt: string;
  entryEndsAt: string;
  publishAt: string;
  images?: EventImages;
  password?: string;
  geohash?: string;
  location?: EventLocation;
  promoterId?: string;
  tenantId?: string;
}

export interface TenantLogo {
  email?: {
    src: string;
    width: number;
    height: number;
  };
  website?: {
    src: string;
    width: number;
    height: number;
  };
}

export interface Tenant {
  id: string;
  oldId?: string;
  name: string;
  slug: string;
  defaultCurrency: string;
  baseUrl?: Record<string, string>;
  logo?: TenantLogo;
}

export type RegionKind = "COUNTRY" | "STATE" | "CITY" | "VENUE";

export interface Region {
  id: string;
  name: string;
  slug: string;
  kind: RegionKind;
  parentId?: string;
  latitude?: number;
  longitude?: number;
  radius?: number;
  enabled: boolean;
  order: number;
}

export interface TenantConfig {
  tenant: Tenant;
  regions: Region[];
}

export interface ApiResponse<T> {
  data: T;
  cursor?: string | null;
}

export interface EventsApiResponse {
  events: Event[];
  cursor?: string | null;
}

export interface ApiError {
  error: string;
  message: string;
  statusCode: number;
}

export interface SearchEventsParams {
  status?: EventStatus;
  approval?: EventApproval;
  visibility?: EventVisibility;
  promoterId?: string;
  deleted?: boolean;
  query?: string;
  latitude?: number;
  longitude?: number;
  radius?: number;
  cursor?: string;
  limit?: number;
}

export interface SearchEventsResponse {
  events: Event[];
  cursor?: string | null;
}
