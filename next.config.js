const withPWA = require('next-pwa');

module.exports = withPWA({
  images: {
    domains: ['storage.googleapis.com', '74f0-177-37-146-48.sa.ngrok.io', 'www.igrejaemcampinagrande.com.br', 'igcgcloud.netlify.app', '288oficial.com'],
  },
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development"
  }
})
