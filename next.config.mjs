// next.config.js
export const env = {
    BASE_URL: process.env.BASE_URL || 'http://192.168.1.103:8000',
};

/** @type {import('next').NextConfig} */
// const nextConfig = {
//     output: "standalone",
//     images: {
//         remotePatterns: [
//             {
//                 protocol: 'https',
//                 // hostname:'https://api.gholamzadeh.com',
//                 hostname: 'http://192.168.1.103:8000',
//                 // pathname: '/**',
//             },
//         ],
//     },
// }
// module.exports = nextConfig
