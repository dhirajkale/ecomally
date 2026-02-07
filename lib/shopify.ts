
import '@shopify/shopify-api/adapters/node';
import { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api';

const shopify = shopifyApi({
    apiKey: process.env.SHOPIFY_API_KEY,
    apiSecretKey: process.env.SHOPIFY_API_SECRET,
    scopes: process.env.SHOPIFY_SCOPES ? process.env.SHOPIFY_SCOPES.split(',') : [],
    hostName: process.env.APP_URL ? process.env.APP_URL.replace(/^https?:\/\//, '') : 'localhost',
    apiVersion: LATEST_API_VERSION,
    isEmbeddedApp: false,
    // SaaS connecting to multiple stores, usually treated as custom app or public app
});

export default shopify;
