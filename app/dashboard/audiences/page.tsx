
export default function AudiencesPage() {
    const segments = [
        {
            id: 1,
            name: "High Value Customers",
            description: "Spent > $500 in last 90 days",
            count: 1240,
            status: "Ready",
            ltv: "$850",
        },
        {
            id: 2,
            name: "Abandoned Checkouts (24h)",
            description: "Added to cart but no purchase",
            count: 342,
            status: "Syncing",
            ltv: "$0",
        },
        {
            id: 3,
            name: "Repeat Buyers",
            description: "Order count > 1",
            count: 5600,
            status: "Ready",
            ltv: "$320",
        },
        {
            id: 4,
            name: "Video Ad Engagers",
            description: "Watched > 50% of video ad",
            count: 8900,
            status: "Processing",
            ltv: "$45",
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Audience Segments</h2>
                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
                    Create Segment
                </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {segments.map((segment) => (
                    <div key={segment.id} className="rounded-xl border bg-card text-card-foreground shadow transition-all hover:shadow-md">
                        <div className="p-6 space-y-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold text-lg leading-none tracking-tight">{segment.name}</h3>
                                    <p className="text-sm text-muted-foreground mt-1">{segment.description}</p>
                                </div>
                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${segment.status === 'Ready' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                    }`}>
                                    {segment.status}
                                </span>
                            </div>

                            <div className="pt-4 border-t flex justify-between items-end">
                                <div>
                                    <div className="text-xs text-muted-foreground uppercase font-bold">Audience Size</div>
                                    <div className="text-3xl font-bold">{segment.count.toLocaleString()}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-xs text-muted-foreground uppercase font-bold">Est. LTV</div>
                                    <div className="text-lg font-semibold">{segment.ltv}</div>
                                </div>
                            </div>

                            <div className="flex gap-2 pt-2">
                                <button className="flex-1 text-xs border rounded py-2 hover:bg-secondary">Sync to Facebook</button>
                                <button className="flex-1 text-xs border rounded py-2 hover:bg-secondary">Export CSV</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
