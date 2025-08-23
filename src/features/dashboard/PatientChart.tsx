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
  data: number[];
  color: string;
}

interface PatientChartProps {
  labels: string[];
  datasets?: LineDatasetConfig[];
  heightClass?: string;
  minimal?: boolean;
}

export function PatientChart({
  labels,
  datasets,
  heightClass = "h-48 md:h-56",
  minimal,
}: PatientChartProps) {
  const safeDatasets = (datasets ?? []).map((d) => ({
    label: d.label,
    data: d.data,
    borderColor: d.color,
    backgroundColor: d.color + (minimal ? "33" : "20"),
    pointBackgroundColor: d.color,
    pointBorderColor: "#fff",
    pointRadius: minimal ? 3 : 5,
    tension: 0.4,
    fill: false,
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
      x: { grid: { display: false } },
      y: { beginAtZero: false, grid: { color: "#eee" } },
    },
  };
  return (
    <div className={`w-full ${heightClass}`}>
      <Line data={data} options={options} />
    </div>
  );
}
