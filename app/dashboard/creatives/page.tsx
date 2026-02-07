
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "lucide-react"
// Badge from lucide is an icon, not a badge component. I'll use simple span or create Badge later.

const creatives = [
    {
        id: "1",
        thumbnail: "https://placehold.co/600x400/png?text=Ad+1",
        type: "image",
        ctr: "2.4%",
        cvr: "1.2%",
        roas: "3.5",
        impressions: 12000,
        conversions: 144,
    },
    {
        id: "2",
        thumbnail: "https://placehold.co/600x400/png?text=Ad+Video",
        type: "video",
        ctr: "3.1%",
        cvr: "1.5%",
        roas: "4.2",
        impressions: 8500,
        conversions: 127,
    },
    {
        id: "3",
        thumbnail: "https://placehold.co/600x400/png?text=Carousel+Img",
        type: "carousel",
        ctr: "1.8%",
        cvr: "0.9%",
        roas: "2.1",
        impressions: 22000,
        conversions: 198,
    },
]

export default function CreativesPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Creative Analysis</h2>
                <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium">
                    Sync Ads
                </button>
            </div>

            <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
                <div className="p-6">
                    <div className="text-lg font-semibold mb-4">Top Performing Creatives</div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Creative</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Impressions</TableHead>
                                <TableHead>CTR</TableHead>
                                <TableHead>CVR</TableHead>
                                <TableHead>ROAS</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {creatives.map((c) => (
                                <TableRow key={c.id}>
                                    <TableCell>
                                        <div className="h-16 w-16 overflow-hidden rounded-md border bg-muted">
                                            <img
                                                src={c.thumbnail}
                                                alt="Creative thumbnail"
                                                className="h-full w-full object-cover transition-all hover:scale-105"
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 capitalize">
                                            {c.type}
                                        </span>
                                    </TableCell>
                                    <TableCell>{c.impressions.toLocaleString()}</TableCell>
                                    <TableCell className="font-medium text-green-600 dark:text-green-400">{c.ctr}</TableCell>
                                    <TableCell>{c.cvr}</TableCell>
                                    <TableCell className="font-bold">{c.roas}x</TableCell>
                                    <TableCell className="text-right">
                                        <button className="text-sm text-muted-foreground hover:text-foreground">Analyze</button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}
