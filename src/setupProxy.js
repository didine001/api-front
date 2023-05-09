module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:7032',
      changeOrigin: true,
    })
  );
};
