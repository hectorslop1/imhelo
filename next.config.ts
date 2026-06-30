import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 defaults images.qualities to [75]; any other quality 400s in prod.
    // Allow the values used across next/image calls + the ShaderImage optimizer (75).
    qualities: [75, 80, 85, 86, 92],
  },
};

export default nextConfig;
