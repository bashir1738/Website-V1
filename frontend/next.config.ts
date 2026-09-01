import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
};

export default nextConfig;
