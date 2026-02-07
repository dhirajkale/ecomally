import "@shopify/shopify-api/adapters/node";
import { Shopify, ApiVersion } from "@shopify/shopify-api";

Shopify.Context.initialize({
    API_KEY: process.env.SHOPIFY_API_KEY!,
    API_SECRET_KEY: process.env.SHOPIFY_API_SECRET!,
    SCOPES: ["read_products"],
    HOST_NAME: process.env.SHOPIFY_HOST!.replace(/^https?:\/\//, ""),
    API_VERSION: ApiVersion.January24,
    IS_EMBEDDED_APP: false,
});

export const shopify = Shopify;
