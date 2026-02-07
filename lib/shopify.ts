import '@shopify/shopify-api/adapters/node';
import { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api';

// Initialize the Shopify library
const shopify = shopifyApi({
    apiKey: process.env.SHOPIFY_API_KEY,
    apiSecretKey: process.env.SHOPIFY_API_SECRET,
    scopes: process.env.SHOPIFY_SCOPES ? process.env.SHOPIFY_SCOPES.split(',') : ['read_products'],
    hostName: process.env.SHOPIFY_HOST ? process.env.SHOPIFY_HOST.replace(/^https?:\/\//, '') : 'localhost',
    apiVersion: LATEST_API_VERSION,
    isEmbeddedApp: false,
});

export default shopify;
