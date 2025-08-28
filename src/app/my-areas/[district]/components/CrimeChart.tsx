"use client";
{/*
This component draws a doughnut chart to show crime breakdown data.
It runs in the browser (client-side) and works with data passed to it. Here's how it works:

1. Create a place to draw the chart (a canvas element) and keep it ready with a reference.
2. When the component loads or data changes:
   - Check if the canvas is ready.
   - Use a library (Chart.js) to draw a doughnut chart.
   - Set the chart with:
     - Labels (string[]) like offence names from the input.
     - Data values (number[]) like crime counts from the input.
     - Colors for each section (string[]), using a default list if none provided.
     - Options to make it responsive, remove borders, and show a legend at the bottom.
3. Clean up the chart when the component is removed to save memory.
4. Display the canvas inside a fixed-height container.
This chart visually shows how crimes are split up for the selected time period using provided arrays.
*/}


import { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

interface CrimeChartProps {
    labels: string[];
    data: number[];
    colors?: string[];
}

export default function CrimeChart({ labels, data, colors }: CrimeChartProps) {
    const crimeChartRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        let crimeChart: Chart<"doughnut", number[], string>;
        if (crimeChartRef.current) {
            crimeChart = new Chart(crimeChartRef.current, {
                type: "doughnut",
                data: {
                    labels,
                    datasets: [
                        {
                            data,
                            backgroundColor: colors || [
                                "#ef4444", // Red for violent
                                "#dc2626",
                                "#f97316", // Orange
                                "#eab308", // Yellow
                                "#8b5cf6", // Purple
                                "#6b7280", // Gray
                                "#34d399", // Green
                                "#10b981",
                                "#3b82f6", // Blue
                                "#6366f1",
                            ],
                            borderWidth: 0,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: "bottom",
                            labels: {
                                padding: 20,
                                usePointStyle: true,
                                font: { size: 12 },
                            },
                        },
                    },
                },
            });
        }

        return () => {
            if (crimeChart) crimeChart.destroy();
        };
    }, [labels, data, colors]);

    return (
        <div className="relative h-[200px]">
            <canvas ref={crimeChartRef} />
        </div>
    );
}