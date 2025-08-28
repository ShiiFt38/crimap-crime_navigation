"use client";

{/*
This component shows a line chart of crime trends over time.
It runs in the browser (client-side) and works with time-based data. Here's how it works:

1. Create a place to draw the chart (a canvas element) and keep it ready with a reference.
2. When the component loads or data changes:
   - Check if the canvas is ready.
   - Use a library (Chart.js) to draw a line chart.
   - Set the chart with:
     - Labels (string[]) like months from the input.
     - Data values (number[]) like total crimes from the input.
     - A blue line with a light fill and smooth curves.
     - Options to make it responsive, hide the legend, and set grid lines.
3. Clean up the chart when the component is removed to save memory.
4. Display the canvas inside a fixed-height container.
This chart helps users see how crime counts change over time using provided arrays of labels and data.
*/}

import { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

interface TrendsChartProps {
    labels: string[];
    data: number[];
}

export default function TrendsChart({ labels, data }: TrendsChartProps) {
    const trendsChartRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        let trendsChart: Chart<"line", number[], string>;
        if (trendsChartRef.current) {
            trendsChart = new Chart(trendsChartRef.current, {
                type: "line",
                data: {
                    labels,
                    datasets: [
                        {
                            label: "Total Crimes",
                            data,
                            borderColor: "#3b82f6",
                            backgroundColor: "rgba(59, 130, 246, 0.1)",
                            tension: 0.4,
                            fill: true,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        y: { beginAtZero: true, grid: { color: "rgba(0, 0, 0, 0.05)" } },
                        x: { grid: { display: false } },
                    },
                },
            });
        }

        return () => {
            if (trendsChart) trendsChart.destroy();
        };
    }, [labels, data]);

    return (
        <div className="relative h-[200px]">
            <canvas ref={trendsChartRef} />
        </div>
    );
}