/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: './dist', // Changes the build output directory to `./dist/`.
  images: {
    domains: ['weather-image.s3.ap-northeast-2.amazonaws.com'],
  },
};

export default nextConfig;
