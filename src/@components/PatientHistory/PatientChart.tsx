"use client";
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export interface LineDatasetConfig {
  label: string;
  data: (number | null)[];
  color: string;
}

interface PatientChartProps {
  labels: string[];
  datasets?: LineDatasetConfig[];
  heightClass?: string;
  minimal?: boolean;
  yMin?: number;
  yMax?: number;
}

export function PatientChart({
  labels,
  datasets,
  // Increased height so a 20-unit step approximates ~40px spacing
  heightClass = "h-64 md:h-72",
  minimal,
  yMin,
  yMax,
}: PatientChartProps) {
  const safeDatasets = (datasets ?? []).map((d) => ({
    label: d.label,
    data: d.data,
    borderColor: d.color,
    backgroundColor: "transparent", // no area fill
    pointBackgroundColor: d.color,
    pointBorderColor: d.color,
    pointBorderWidth: 2,
    pointRadius: minimal ? 4 : 6,
    pointHoverRadius: 7,
    tension: 0.45,
    fill: false,
    spanGaps: true,
  }));
  const data = { labels, datasets: safeDatasets };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // legend hidden per request (no top dots for Systolic/Diastolic)
      },
      title: { display: false },
      tooltip: { mode: "index" as const, intersect: false },
    },
    interaction: { mode: "index" as const, intersect: false },
    scales: {
      x: {
        grid: { color: "#f1f5f9" },
        // Styling per request: text-xs (~12px), brand color, normal weight
        ticks: {
          color: "var(--color-brand-deep)",
          font: { size: 12, weight: "normal" as const },
        },
      },
      y: {
        grid: { display: true, color: "#e5e7eb" }, // light gray vertical lines
        border: { display: true, color: "#cbd5e1" }, // gray x-axis baseline
        ticks: {
          color: "var(--color-brand-deep)",
          font: { size: 12, weight: "normal" as const },
          stepSize: 20,
        },
        beginAtZero: false,
        min: typeof yMin === "number" ? yMin : undefined,
        max: typeof yMax === "number" ? yMax : undefined,
      },
    },
  };
  return (
    <div className={`w-full ${heightClass}`}>
      <Line data={data} options={options} />
    </div>
  );
}
