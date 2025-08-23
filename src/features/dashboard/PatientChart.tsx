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
  heightClass = "h-48 md:h-56",
  minimal,
  yMin,
  yMax,
}: PatientChartProps) {
  const safeDatasets = (datasets ?? []).map((d, i) => ({
    label: d.label,
    data: d.data,
    borderColor: d.color,
    backgroundColor: i === 0 ? d.color + "22" : d.color + "10",
    pointBackgroundColor: "#ffffff",
    pointBorderColor: d.color,
    pointBorderWidth: 2,
    pointRadius: minimal ? 3 : 5,
    pointHoverRadius: 6,
    tension: 0.45,
    fill: i === 0,
    spanGaps: true,
  }));
  const data = { labels, datasets: safeDatasets };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: !minimal,
        position: "top" as const,
        labels: { usePointStyle: true, boxWidth: 8 },
      },
      title: { display: false },
      tooltip: { mode: "index" as const, intersect: false },
    },
    interaction: { mode: "index" as const, intersect: false },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#6b7280", font: { size: 11 } },
      },
      y: {
        beginAtZero: false,
        min: typeof yMin === "number" ? yMin : undefined,
        max: typeof yMax === "number" ? yMax : undefined,
        grid: { color: "#f1f5f9" },
        ticks: { color: "#6b7280", font: { size: 11 }, stepSize: 20 },
      },
    },
  };
  return (
    <div className={`w-full ${heightClass}`}>
      <Line data={data} options={options} />
    </div>
  );
}
