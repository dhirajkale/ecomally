
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';

const SHOPIFY_SECRET = process.env.SHOPIFY_API_SECRET || 'your_secret_here';

function verifyShopifyWebhook(body: string, hmac: string | null) {
    if (!hmac) return false;
    const signature = crypto
        .createHmac('sha256', SHOPIFY_SECRET)
        .update(body, 'utf8')
        .digest('base64');
    return signature === hmac;
}

export async function POST(req: Request) {
    try {
        const rawBody = await req.text();
        const hmacHeader = req.headers.get('X-Shopify-Hmac-Sha256');
        const topic = req.headers.get('X-Shopify-Topic');
        const shopDomain = req.headers.get('X-Shopify-Shop-Domain');

        if (!verifyShopifyWebhook(rawBody, hmacHeader)) {
            console.warn('Invalid Webhook HMAC');
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        if (!shopDomain) {
            return NextResponse.json({ error: 'Missing shop domain' }, { status: 400 });
        }

        const payload = JSON.parse(rawBody);

        // Find store
        const store = await prisma.store.findUnique({
            where: { shop: shopDomain },
        });

        if (!store) {
            // Potentially log warning or auto-create store if feasible (but usually OAuth first)
            console.warn(`Webhook received for unknown store: ${shopDomain}`);
            return NextResponse.json({ message: 'Store unknown' }, { status: 200 });
        }

        // Process based on topic
        let eventType = 'webhook_event';
        if (topic === 'orders/create') eventType = 'purchase';
        if (topic === 'checkouts/create') eventType = 'checkout_started';
        if (topic === 'checkouts/update') eventType = 'checkout_updated';

        // Save Event
        await prisma.event.create({
            data: {
                storeId: store.id,
                type: eventType,
                timestamp: payload.created_at ? new Date(payload.created_at) : new Date(),
                revenue: payload.total_price ? parseFloat(payload.total_price) : undefined,
                currency: payload.currency,
                orderId: payload.id?.toString(),
                source: 's2s', // Server to Server
                properties: payload, // Store raw payload for debugging/expansion
            },
        });

        console.log(`Processed webhook ${topic} for ${shopDomain}`);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Webhook Error:', error);
        return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
    }
}
