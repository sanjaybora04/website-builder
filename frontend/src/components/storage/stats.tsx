"use client"

import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
    used: {
        label: "Used",
        color: "#3B82F6",
    },
    remaining: {
        label: "Remaining",
        color: "#374151",
    },
} satisfies ChartConfig

function formatBytes(bytes: number, useGB: boolean = true) {
    return useGB ? (bytes / (1024 ** 3)).toFixed(2) : (bytes / (1024 ** 2)).toFixed(2)
}

export default function Stats({ usage }: { usage: { storageLimit: number, usedStorage: number } }) {
    const isGB = usage.storageLimit >= 1024 ** 3 // 1 GB in bytes

    const used = usage.usedStorage
    const limit = usage.storageLimit
    const remaining = limit - used
    const percentUsed = ((used / limit) * 100).toFixed(1)

    const chartData = [
        { item: "used", value: parseFloat(percentUsed), fill: "var(--color-used)" },
        { item: "remaining", value: 100 - parseFloat(percentUsed), fill: "var(--color-remaining)" },
    ]

    return (
        <div className="flex gap-5 items-center justify-center">
            <ChartContainer
                config={chartConfig}
                className="aspect-square h-52"
            >
                <PieChart>
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                    />
                    <Pie data={chartData} dataKey="value" nameKey="item" />
                </PieChart>
            </ChartContainer>
            <div>
                <div><b>Total Storage</b>: {formatBytes(limit, isGB)} {isGB ? 'GB' : 'MB'}</div>
                <div>
                    <div className="w-3 h-3 inline-flex mr-2 rounded" style={{ background: chartConfig.used.color }} />
                    <b>Used</b>: {formatBytes(used, isGB)} {isGB ? 'GB' : 'MB'}
                </div>
                <div>
                    <div className="w-3 h-3 inline-flex mr-2 rounded" style={{ background: chartConfig.remaining.color }} />
                    <b>Remaining</b>: {formatBytes(remaining, isGB)} {isGB ? 'GB' : 'MB'}
                </div>
            </div>
        </div>
    )
}
