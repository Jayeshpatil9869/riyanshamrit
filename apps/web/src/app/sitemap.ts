import type { MetadataRoute } from "next";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const res = await fetch(`${API}/api/v1/seo/sitemap`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const json = (await res.json()) as {
      data?: { urls?: Array<{ loc: string; lastmod?: string }> };
    };
    return (json.data?.urls ?? []).map((u) => ({
      url: u.loc,
      lastModified: u.lastmod ? new Date(u.lastmod) : undefined,
    }));
  } catch {
    return [];
  }
}
