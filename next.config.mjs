/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'api.gholamzadeh.com',
                port: '',
                pathname: '/**',
                search: '',
            },
        ],
    },
    env: {
        NEXT_PUBLIC_API_BASE_URL: 'https://api.gholamzadeh.com',
    },
};

export default nextConfig;