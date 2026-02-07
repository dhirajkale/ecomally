import { Sidebar } from '@/components/dashboard/sidebar'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Ecomally Dashboard',
    description: 'Marketing Intelligence for Shopify Brands',
}

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen bg-background">
            <div className="hidden md:flex w-64 flex-col fixed inset-y-0 z-50">
                <Sidebar className="h-full border-r bg-background" />
            </div>
            <main className="flex-1 md:pl-64 h-full bg-slate-50/50 dark:bg-slate-950/50">
                <div className="h-full p-8 overflow-y-auto">
                    {children}
                </div>
            </main>
        </div>
    )
}
