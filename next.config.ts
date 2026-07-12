import type { NextConfig } from "next";

const scriptSources = ["'self'", "'unsafe-inline'"];

if (process.env.NODE_ENV === "development") {
  scriptSources.push("'unsafe-eval'");
}

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https://commons.wikimedia.org https://upload.wikimedia.org",
              `script-src ${scriptSources.join(" ")}`,
              "connect-src 'self'",
              "frame-src https://www.openstreetmap.org",
            ].join("; "),
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
      {
        // The live tournament page must never be served stale from a browser
        // cache. Keep it fresh in the browser (no-store) while still letting the
        // Vercel edge hold a ~60s copy to absorb load. Pairs with the page's
        // revalidate = 60.
        source: "/fifa",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, must-revalidate",
          },
          {
            key: "CDN-Cache-Control",
            value: "public, s-maxage=60, stale-while-revalidate=300",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
