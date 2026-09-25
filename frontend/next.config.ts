import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },

  // Dev-only: the browser blocks cross-origin requests to /_next assets and
  // the HMR socket, so reaching the dev server over the LAN IP (rather than
  // localhost) yields an unstyled/broken page. The last label is wildcarded
  // because the LAN address is DHCP-assigned and changes between networks.
  // Development only — has no effect on production builds.
  allowedDevOrigins: ["10.112.108.*"],

  // Blog / event cover images are served from Cloudinary.
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },

  // /talent and /hire-engineers were folded into the Engineering page.
  // Submenu pages now live under their parent routes.
  async redirects() {
    return [
      { source: "/talent", destination: "/engineering#hire", permanent: false },
      {
        source: "/hire-engineers",
        destination: "/engineering#hire",
        permanent: false,
      },
      { source: "/team", destination: "/about/team", permanent: true },
      { source: "/events", destination: "/community/events", permanent: true },
      {
        source: "/events/:slug",
        destination: "/community/events/:slug",
        permanent: true,
      },
      { source: "/blog", destination: "/community/blog", permanent: true },
      {
        source: "/blog/:slug",
        destination: "/community/blog/:slug",
        permanent: true,
      },
      { source: "/alumni", destination: "/community/alumni", permanent: true },
    ];
  },

  // LOW-4: HTTP security headers applied to every response.
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Prevents the page from being framed (clickjacking protection).
          { key: "X-Frame-Options", value: "DENY" },
          // Stops browsers from MIME-sniffing a response away from its declared Content-Type.
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Controls how much referrer info is included with requests.
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Restricts browser features like camera and geolocation.
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          // Forces HTTPS for 1 year (only effective when served over HTTPS).
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
        ],
      },
    ];
  },
};

export default nextConfig;
