
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { event_type, store_domain, url, referrer, payload, timestamp } = body;

        // Validate request
        if (!store_domain || !event_type) {
            return NextResponse.json({ error: 'Missing required fields: store_domain, event_type' }, { status: 400 });
        }

        // Find store
        const store = await prisma.store.findUnique({
            where: { shop: store_domain },
            select: { id: true, isActive: true },
        });

        if (!store || !store.isActive) {
            return NextResponse.json({ error: 'Unauthorized: Store not found or inactive' }, { status: 403 });
        }

        // Extract payload data for cleaner schema saving if needed (e.g. revenue)
        let revenue = 0;
        if (payload?.revenue && !isNaN(parseFloat(payload.revenue))) {
            revenue = parseFloat(payload.revenue);
        }

        // Persist event
        const event = await prisma.event.create({
            data: {
                storeId: store.id,
                type: event_type,
                timestamp: timestamp ? new Date(timestamp) : new Date(),
                url: url || '',
                referrer: referrer || '',
                revenue: revenue || undefined,
                properties: payload || {},
                // Attribution could be extracted from UTMs in URL here
            },
        });

        return NextResponse.json({ success: true, eventId: event.id });
    } catch (error) {
        console.error('Tracking API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function OPTIONS(req: Request) {
    return NextResponse.json({}, { headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS' } });
}
