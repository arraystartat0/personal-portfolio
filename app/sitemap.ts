import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/site-url";
import { sites } from "./lib/sites";

/*
 * Four URLs, derived from sites.ts so a fourth discipline joins the sitemap by
 * being added there and nowhere else.
 *
 * The two in-progress sites stay in it. They are thin, and the argument for
 * hiding them is real, but they are linked from the hub either way and their
 * cards now say "In progress" out loud; a crawler that finds them finds an
 * honest page. `priority` is the lever that says which one matters, and it is
 * relative within this site only, so spending it on /design costs nothing.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...sites.map((site) => ({
      url: `${SITE_URL}${site.href}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: site.status === "live" ? 0.9 : 0.3,
    })),
  ];
}
