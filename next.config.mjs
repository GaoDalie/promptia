/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      // appDir has been removed as it's now the default
    },
    serverExternalPackages: ["mongoose"], // moved from experimental
    images: {
      domains: ['lh3.googleusercontent.com'],
    },
    webpack(config) {
      config.experiments = {
        ...config.experiments,
        topLevelAwait: true,
      }
      return config
    }
  }
  
  export default nextConfig