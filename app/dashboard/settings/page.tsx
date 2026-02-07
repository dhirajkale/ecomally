
export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
                <p className="text-muted-foreground mt-2">Manage your account and store connections.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">

                {/* Store Connection */}
                <div className="rounded-xl border bg-card text-card-foreground shadow">
                    <div className="flex flex-col space-y-1.5 p-6">
                        <h3 className="font-semibold leading-none tracking-tight">Connect Shopify Store</h3>
                        <p className="text-sm text-muted-foreground">Enter your store domain to install the Ecomally app.</p>
                    </div>
                    <div className="p-6 pt-0">
                        <form action="/api/shopify/auth" method="GET" className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="shop">
                                    Store Domain
                                </label>
                                <input
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                    id="shop"
                                    name="shop"
                                    placeholder="example.myshopify.com"
                                    required
                                />
                            </div>
                            <button
                                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-full"
                                type="submit"
                            >
                                Connect Store
                            </button>
                        </form>
                    </div>
                </div>

                {/* API Keys */}
                <div className="rounded-xl border bg-card text-card-foreground shadow">
                    <div className="flex flex-col space-y-1.5 p-6">
                        <h3 className="font-semibold leading-none tracking-tight">API Keys</h3>
                        <p className="text-sm text-muted-foreground">Manage your API keys for custom integrations.</p>
                    </div>
                    <div className="p-6 pt-0 space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none">Public Key</label>
                            <div className="flex gap-2">
                                <input readOnly value="pk_live_51M..." className="flex h-9 w-full rounded-md border border-input bg-muted px-3 py-1 text-sm" />
                                <button className="border rounded px-3 text-xs uppercase font-bold">Copy</button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none">Secret Key</label>
                            <div className="flex gap-2">
                                <input type="password" readOnly value="sk_live_..." className="flex h-9 w-full rounded-md border border-input bg-muted px-3 py-1 text-sm" />
                                <button className="border rounded px-3 text-xs uppercase font-bold">Reveal</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
