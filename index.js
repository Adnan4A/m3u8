const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const https = require('https');
const http = require('http');

const app = express();

app.get('/test', function(req, res) {
  http.get('http://realsport.scalecdn.co:8080', function(r) {
    res.send('Connected! Status: ' + r.statusCode);
  }).on('error', function(e) {
    res.send('Failed to connect: ' + e.message);
  });
});

app.use('/stream', createProxyMiddleware({
  target: 'http://realsport.scalecdn.co:8080',
  changeOrigin: true,
  pathRewrite: { '^/stream': '' },
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', function() {
  console.log('Proxy running on port ' + PORT);
});
```

Then open this in your browser:
```
https://m3u8-production-aa08.up.railway.app/test
