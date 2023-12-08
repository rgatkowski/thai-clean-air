/** @type {import('next').NextConfig} */
const nextConfig = {
    publicRuntimeConfig: {
        // Will be available on both server and client
        apiEndpoint: process.env.NEXT_PUBLIC_API_ENDPOINT,
        apiKey: process.env.NEXT_PUBLIC_API_KEY,
    },
};

module.exports = nextConfig
