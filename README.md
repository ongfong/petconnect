# petconnect
React Node NextJS Frontend
# Prerequisites
- You should create node_modules file before Install.
- You should have next.config.js file and add these in you next.config.js file
```
const withCSS = require('@zeit/next-css');
module.exports = withCSS({
  publicRuntimeConfig: {
    APP_NAME: 'Pet-Connect',
    API_DEVELOPMENT: 'http://localhost:8000/api',
    API_PRODUCTION: 'https://petconnect.com/api',
    PRODUCTION: false,
    DOMAIN_DEVELOPMENT: 'http://localhost:3000',
    DOMAIN_PRODUCTION: 'https://petconnect.com',
    GOOGLE_MAP_API: 'you google map api',
    GOOGLE_CLIENT_ID:
      'you google client ID',
  },
});
```

# Installing
npm run dev

# Authors
  Puangporn Kowsamruang,
 Theeranun Tongprasong
