const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  console.log("set up");
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5433/api',
      changeOrigin: true,
    })
  );
};