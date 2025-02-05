/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'api.gholamzadeh.com',
                // hostname: 'http://192.168.1.103:8000',
                pathname: '/**',
            },
        ],
    },
};

// Export the configuration using ES module syntax
export default nextConfig;