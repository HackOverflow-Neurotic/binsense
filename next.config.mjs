/** @type {import('next').NextConfig} */
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "out",
});
const nextConfig = {
    output:'export',
  };
  export default withPWA({
    nextConfig
  });