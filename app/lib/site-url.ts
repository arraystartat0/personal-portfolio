/*
 * The one place the production origin is written.
 *
 * It exists because absolute URLs are unavoidable now: `metadataBase` resolves
 * every OG image path against it, the sitemap has to emit fully-qualified
 * locations, and the JSON-LD identity is keyed on it. Hardcoding the host in
 * four files means a domain change silently half-lands.
 *
 * Preview deployments get their own host rather than the production one. A
 * preview whose card points at mbhatt.com would look right in a scraper and be
 * a lie: you would be checking the live card, not the one you just built.
 */
const PRODUCTION_ORIGIN = "https://mbhatt.com";

function resolveOrigin(): string {
  /* An explicit override wins, which is what makes local OG checks possible:
     NEXT_PUBLIC_SITE_URL=http://localhost:3000 and the paths resolve. */
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;

  /* Vercel sets VERCEL_URL to the per-deployment host. Only branch previews want
     it; production reads its own canonical name, not the deployment hash. */
  if (process.env.VERCEL_ENV === "preview" && process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return PRODUCTION_ORIGIN;
}

/** Origin with no trailing slash, so `${SITE_URL}/sitemap.xml` is safe. */
export const SITE_URL = resolveOrigin().replace(/\/$/, "");
