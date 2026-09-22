const API_BASE =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "http://localhost:4000";

const TOKEN_KEY = "ra_admin_access_token";
const REFRESH_KEY = "ra_admin_refresh_token";
const USER_KEY = "ra_admin_user";

export type AdminSessionUser = {
  id: string;
  email: string;
  name: string;
  role: "admin";
};

type ApiEnvelope<T> = {
  success: boolean;
  data?: T;
  error?: { code: string; message: string };
};

export function getAdminToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function getStoredAdminUser(): AdminSessionUser | null {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as AdminSessionUser) : null;
  } catch {
    return null;
  }
}

export function clearAdminSession() {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(USER_KEY);
  } catch {
    /* ignore */
  }
}

export function saveAdminSession(payload: {
  accessToken: string;
  refreshToken?: string;
  user: AdminSessionUser;
}) {
  localStorage.setItem(TOKEN_KEY, payload.accessToken);
  if (payload.refreshToken) {
    localStorage.setItem(REFRESH_KEY, payload.refreshToken);
  }
  localStorage.setItem(USER_KEY, JSON.stringify(payload.user));
}

async function adminFetch<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const token = getAdminToken();
  const headers = new Headers(init.headers);
  headers.set("Content-Type", "application/json");
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_BASE}${path}`, { ...init, headers });
  const json = (await res.json().catch(() => ({}))) as ApiEnvelope<T>;
  if (!res.ok || json.success === false) {
    throw new Error(json.error?.message || `Request failed (${res.status})`);
  }
  return json.data as T;
}

export async function adminLogin(username: string, password: string) {
  const data = await adminFetch<{
    accessToken: string;
    refreshToken: string;
    user: AdminSessionUser;
    permissions: string[];
  }>("/api/v1/admin/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
  saveAdminSession({
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
    user: data.user,
  });
  return data;
}

export async function fetchAdminDashboard() {
  return adminFetch<{
    products: number;
    orders: number;
    customers: number;
    paidRevenue: string;
  }>("/api/v1/admin/dashboard");
}

export async function fetchAdminProducts() {
  return adminFetch<{ items: AdminProductRow[] }>(
    "/api/v1/admin/products?limit=50",
  );
}

export async function createAdminProduct(body: Record<string, unknown>) {
  return adminFetch<AdminProductRow>("/api/v1/admin/products", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function updateAdminProduct(
  id: string,
  body: Record<string, unknown>,
) {
  return adminFetch<AdminProductRow>(`/api/v1/admin/products/${id}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}

export async function deleteAdminProduct(id: string) {
  return adminFetch<AdminProductRow>(`/api/v1/admin/products/${id}`, {
    method: "DELETE",
  });
}

export async function fetchAdminOrders() {
  return adminFetch<{ items: AdminOrderRow[] }>(
    "/api/v1/admin/orders?limit=50",
  );
}

export async function updateAdminOrderStatus(id: string, status: string) {
  return adminFetch<AdminOrderRow>(`/api/v1/admin/orders/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export async function fetchAdminCustomers() {
  return adminFetch<{ items: AdminCustomerRow[] }>(
    "/api/v1/admin/customers?limit=50",
  );
}

export async function fetchAdminCoupons() {
  return adminFetch<{ items: AdminCouponRow[] }>("/api/v1/admin/coupons");
}

export async function createAdminCoupon(body: Record<string, unknown>) {
  return adminFetch<AdminCouponRow>("/api/v1/admin/coupons", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function fetchAdminActivity() {
  return adminFetch<{ items: AdminActivityRow[] }>("/api/v1/admin/activity");
}

export type AdminProductRow = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: string | number;
  compareAtPrice?: string | number | null;
  imageUrl?: string | null;
  images?: string[];
  stockQuantity?: number | null;
  isFeatured?: boolean | null;
  isActive?: boolean | null;
};

export type AdminOrderRow = {
  id: string;
  userId?: string | null;
  totalAmount: string | number;
  status: string;
  shippingAddress?: Record<string, unknown> | null;
  createdAt?: string;
};

export type AdminCustomerRow = {
  id: string;
  email: string;
  fullName?: string | null;
  phone?: string | null;
  avatarUrl?: string | null;
  createdAt?: string;
};

export type AdminCouponRow = {
  id: string;
  code: string;
  description?: string | null;
  discountType: string;
  discountValue: string | number;
  minOrderAmount?: string | number | null;
  maxRedemptions?: number | null;
  redemptionCount?: number | null;
  isActive?: boolean | null;
  endsAt?: string | null;
};

export type AdminActivityRow = {
  id: string;
  action: string;
  entityType?: string | null;
  entityId?: string | null;
  description: string;
  createdAt?: string;
};
