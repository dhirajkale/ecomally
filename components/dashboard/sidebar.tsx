"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
    LayoutDashboard,
    BarChart,
    Megaphone,
    BookOpen,
    Users,
    Settings,
    Store,
    LogOut,
    Image
} from "lucide-react"

const sidebarItems = [
    {
        title: "Overview",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Attribution",
        href: "/dashboard/attribution",
        icon: BarChart,
    },
    {
        title: "Creatives",
        href: "/dashboard/creatives",
        icon: Image,
    },
    {
        title: "Catalogs",
        href: "/dashboard/catalogs",
        icon: BookOpen,
    },
    {
        title: "Audiences",
        href: "/dashboard/audiences",
        icon: Users,
    },
    {
        title: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
    },
]

export function Sidebar({ className }: { className?: string }) {
    const pathname = usePathname()

    return (
        <div className={cn("pb-12 w-64 border-r bg-background", className)}>
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight text-foreground flex items-center gap-2">
                        <Store className="h-5 w-5" />
                        Ecomally
                    </h2>
                    <div className="space-y-1">
                        {sidebarItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:text-primary",
                                    pathname === item.href
                                        ? "bg-secondary text-primary"
                                        : "text-muted-foreground hover:bg-secondary/50"
                                )}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.title}
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="px-3 py-2">
                    <h3 className="mb-2 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Store</h3>
                    <div className="space-y-1 px-3">
                        <div className="text-sm font-medium">Store: My Demo Shop</div>
                        <div className="text-xs text-muted-foreground">Connected via API</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
