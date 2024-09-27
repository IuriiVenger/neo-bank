/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.API_URL,
    TENANT_ID: process.env.TENANT_ID,
    DISABLE_LANDING: process.env.DISABLE_LANDING,
    DISABLE_STATIC_PAGES: process.env.DISABLE_STATIC_PAGES,
    DISABLE_FIAT: process.env.DISABLE_FIAT,
    DEFAULT_THEME: process.env.DEFAULT_THEME,
  },
};

export default nextConfig;
