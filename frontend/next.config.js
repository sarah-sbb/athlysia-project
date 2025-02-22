/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',       // Protocole utilisé (Cloudinary utilise HTTPS)
        hostname: 'res.cloudinary.com', // Domaine de Cloudinary
        port: '',                // Laisse vide car Cloudinary ne requiert pas de port spécifique
        pathname: '/**',         // Toutes les images sous ce domaine sont autorisées
      },
    ],
  },
};

module.exports = nextConfig;
