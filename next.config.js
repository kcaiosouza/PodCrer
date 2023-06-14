module.exports = {
  webpack: (config, { webpack }) => {
    config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//));
    return config;
  },
  future: {
    webpack5: true,
  },
  images: {
    domains: ['storage.googleapis.com', '74f0-177-37-146-48.sa.ngrok.io', 'www.igrejaemcampinagrande.com.br', 'igcgcloud.netlify.app', '288oficial.com'],
  }
}