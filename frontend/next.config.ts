import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
  async redirects() {
    return [
      { source: "/talent", destination: "/engineering#hire", permanent: false },
      {
        source: "/hire-engineers",
        destination: "/engineering#hire",
        permanent: false,
      },
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
