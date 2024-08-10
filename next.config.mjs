/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["avatar.githubusercontent.com", "lh3.googleusercontent.com"],
  },
  env: {
    EDGE_STORE_ACCESS_KEY: process.env.EDGE_STORE_ACCESS_KEY,
    EDGE_STORE_SECRET_KEY: process.env.EDGE_STORE_SECRET_KEY,
    NEXT_APIURL: "http://localhost:8080/api/v1",
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
