
import { NextResponse } from 'next/server';
import crypto from 'crypto';

const SCOPES = 'read_products,read_orders,read_customers,read_analytics,output_pixel_scripts';
const API_KEY = process.env.SHOPIFY_API_KEY;
const APP_URL = process.env.APP_URL; // e.g., https://ecomally.com

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const shop = searchParams.get('shop');

    if (!shop) {
        return NextResponse.json({ error: 'Missing shop parameter' }, { status: 400 });
    }

    // Generate random nonce
    const state = crypto.randomBytes(16).toString('hex');
    const redirectUri = `${APP_URL}/api/shopify/callback`;

    const authUrl = `https://${shop}/admin/oauth/authorize?client_id=${API_KEY}&scope=${SCOPES}&redirect_uri=${redirectUri}&state=${state}&grant_options[]=per-user`;

    return NextResponse.redirect(authUrl);
}
