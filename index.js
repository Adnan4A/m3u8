const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/stream', createProxyMiddleware({
  target: 'http://realsport.scalecdn.co:8080',
  changeOrigin: true,
  pathRewrite: { '^/stream': '' },
  on: {
    proxyRes: function(proxyRes) {
      proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    }
  }
}));

app.listen(process.env.PORT || 3000, function() {
  console.log('Proxy running');
});
