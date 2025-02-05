// next.config.js
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

export const env = {
    BASE_URL: process.env.BASE_URL || 'https://api.gholamzadeh.com',
};




