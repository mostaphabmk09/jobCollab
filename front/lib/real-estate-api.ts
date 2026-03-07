const API_BASE_URL = "http://localhost:4000";

export type RealEstateAxis = "ACHAT" | "GESTION" | "SOUS_LOCATION";
export type InvestmentMode = "DEFINE" | "DISCUSS";

export type RealEstatePayload = {
  axis: RealEstateAxis;
  title: string;
  description: string;
  city: string;
  propertyType: string;
  district?: string;
  rooms?: string;
  purpose?: string;
  investmentMode?: InvestmentMode;
  totalBudget?: number;
  partners?: number;
  revenue?: string;
  managementType?: string;
  commission?: string;
  airbnbLink?: string;
  maxRent?: string;
  exploitation?: string;
  tags?: string[];
};

export type RealEstateOpportunity = {
  id: string;
  title: string;
  description: string;
  location: string | null;
  immobilier: {
    axis: RealEstateAxis;
    propertyType: string;
    city: string;
    district: string | null;
    rooms: string | null;
    purpose: string | null;
    investmentMode: string | null;
    totalBudget: number | null;
    partners: number | null;
    revenue: string | null;
    managementType: string | null;
    commission: string | null;
    airbnbLink: string | null;
    maxRent: string | null;
    exploitation: string | null;
    tags: string[];
  };
};

async function request<T>(
  path: string,
  options: RequestInit & { accessToken: string },
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${options.accessToken}`,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const data = (await response.json().catch(() => null)) as
      | { message?: string | string[] }
      | null;

    const message = Array.isArray(data?.message)
      ? data.message.join(", ")
      : data?.message || "Request failed";

    throw new Error(message);
  }

  return (await response.json()) as T;
}

export function createRealEstateOpportunity(
  payload: RealEstatePayload,
  accessToken: string,
) {
  return request<RealEstateOpportunity>("/opportunities/real-estate", {
    method: "POST",
    body: JSON.stringify(payload),
    accessToken,
  });
}

export function updateRealEstateOpportunity(
  opportunityId: string,
  payload: Partial<RealEstatePayload>,
  accessToken: string,
) {
  return request<RealEstateOpportunity>(
    `/opportunities/real-estate/${opportunityId}`,
    {
      method: "PATCH",
      body: JSON.stringify(payload),
      accessToken,
    },
  );
}

export function getRealEstateOpportunity(
  opportunityId: string,
  accessToken: string,
) {
  return request<RealEstateOpportunity>(
    `/opportunities/real-estate/${opportunityId}`,
    {
      method: "GET",
      accessToken,
    },
  );
}
