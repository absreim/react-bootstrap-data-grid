/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    silenceDeprecations: ["import"],
    quietDeps: true,
  },
};

export default nextConfig;
