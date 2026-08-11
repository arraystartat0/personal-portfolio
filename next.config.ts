import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /*
      75 is the default and is fine for the work thumbnails. The About portrait
      is a photograph shown large against flat paper, where the source is
      already close to its pixel ceiling, so it gets the higher setting and has
      to opt in here: Next only permits qualities named in this list.
    */
    qualities: [75, 90],
    /*
      AVIF first, WebP behind it. Every image here is imported statically, so it
      is encoded once at build time and served from cache forever after; the
      slower encode is paid once and the smaller file is paid on every visit.
      A browser without AVIF still gets the WebP.
    */
    formats: ["image/avif", "image/webp"],
    /*
      A year. Static imports give each source a content-hashed URL, so a changed
      image is a different URL and there is nothing stale to serve. The default
      expiry exists for remote sources that can change under the same path,
      which is not a case this site has.
    */
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;
