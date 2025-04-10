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

const chartData = [
    { item: "used", value: 0.3, fill: "var(--color-used)" },
    { item: "remaining", value: 0.7, fill: "var(--color-remaining)" },
]

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

export default function Stats() {
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
                <div><b>Total Storage</b>: 1gb</div>
                <div>
                    <div className="w-3 h-3 inline-flex mr-2 rounded" style={{background:chartConfig.used.color}}/>
                    <b>Used</b>: 100mb
                </div>
                <div>
                    <div className="w-3 h-3 inline-flex mr-2 rounded" style={{background:chartConfig.remaining.color}}/>
                    <b>Remaining</b>: 900mb
                </div>
            </div>
        </div>
    )
}
