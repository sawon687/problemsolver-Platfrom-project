/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
    reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'placekitten.com'], 
     remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**', 
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co', 
        pathname: '/**',
      },
     
      {
        protocol: 'https',
        hostname: 'i.imgbb.com',
        pathname: '/**',
      },
       {
        protocol: 'https',
        hostname: 'transparenttextures.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
      },
     ]
    
  },
};

export default nextConfig;
