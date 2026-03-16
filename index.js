const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

app.use('/stream', createProxyMiddleware({
  target: 'http://realsport.scalecdn.co:8080',
  changeOrigin: true,
  pathRewrite: { '^/stream': '' },
  on: {
    proxyRes: (proxyRes) => {
      proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    }
  }
}));

app.listen(process.env.PORT || 3000);
```

---

**Step 2: Deploy to Railway**

1. Go to **railway.app** → sign in with GitHub
2. Click **New Project** → **Deploy from GitHub repo**
3. Push your 2 files to a GitHub repo and connect it
4. Railway auto-detects Node.js and deploys it

---

**Step 3: Use your stream URL**

Once deployed, Railway gives you a URL like:
```
https://stream-proxy-production.up.railway.app
```

Your stream URL becomes:
```
https://stream-proxy-production.up.railway.app/stream/live/Curtis1/Curtis2/704086.m3u8
