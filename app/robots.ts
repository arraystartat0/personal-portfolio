import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/site-url";

/*
 * Everything is crawlable. There is no admin surface, no API and no auth here,
 * so the only job this file has is pointing at the sitemap: a crawler that
 * arrives on a deep link has no other way to learn the other three pages exist.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
