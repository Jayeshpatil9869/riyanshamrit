export default function robots() {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "https://riyanshamrit.com";
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${base}/sitemap.xml`,
  };
}
