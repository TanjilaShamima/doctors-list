"use client";
import {
  CategoryScale,
  Chart as ChartJS,
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
  Legend
);

interface PatientChartProps {
  labels: string[];
  values: number[];
  title?: string;
}

export function PatientChart({
  labels,
  values,
  title = "Patients",
}: PatientChartProps) {
  const data = {
    labels,
    datasets: [
      {
        label: title,
        data: values,
        borderColor: "#2563eb",
        backgroundColor: "rgba(37,99,235,0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" as const },
      title: { display: !!title, text: title },
    },
    scales: {
      x: { ticks: { autoSkip: true, maxTicksLimit: 8 } },
      y: { beginAtZero: true },
    },
  };
  return (
    <div className="w-full h-64 sm:h-80">
      <Line data={data} options={options} />
    </div>
  );
}
