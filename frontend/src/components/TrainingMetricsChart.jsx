import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Papa from "papaparse";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

const TrainingMetricsChart = () => {
  const [chartData, setChartData] = useState(null);
  const [epochs, setEpochs] = useState([]);

  useEffect(() => {
    fetch("/assets/results.csv")
      .then((response) => response.text())
      .then((csvText) => {
        const results = Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
        });

        const data = results.data.filter((row) => row.epoch); // Remove empty rows
        const epochsArray = data.map((row) => row.epoch);
        setEpochs(epochsArray);

        setChartData({
          accuracyTop1: data.map((row) => row["metrics/accuracy_top1"]),
          accuracyTop5: data.map((row) => row["metrics/accuracy_top5"]),
          trainLoss: data.map((row) => row["train/loss"]),
          valLoss: data.map((row) => row["val/loss"]),
          lr: data.map((row) => row["lr/pg0"]),
        });
      });
  }, []);

  const buildChart = (labels, datasets) => ({
    labels,
    datasets: datasets.map((ds) => ({
      label: ds.label,
      data: ds.data,
      borderColor: ds.color,
      fill: false,
      tension: 0.2,
    })),
  });

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6">
          <h1 className="text-2xl font-semibold text-white">
            Model Training Metrics
            <span className="block text-blue-100 text-sm mt-1 font-normal">
              Training Performance Visualization
            </span>
          </h1>
        </div>

        {chartData ? (
          <div className="p-6 space-y-8">
            {/* Accuracy Chart */}
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <div className="flex items-center space-x-2 mb-4">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <h2 className="text-xl font-semibold text-gray-800">
                  Accuracy Metrics
                </h2>
              </div>
              <Line
                data={buildChart(epochs, [
                  {
                    label: "DL performance",
                    data: chartData.accuracyTop1,
                    color: "rgb(59,130,246)",
                  },
                  {
                    label: "Real Data",
                    data: chartData.accuracyTop5,
                    color: "rgb(34,197,94)",
                  },
                ])}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "top",
                      labels: { color: "#1f2937" },
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: false,
                      grid: { color: "#e5e7eb" },
                      ticks: { color: "#4b5563" },
                    },
                    x: {
                      grid: { color: "#e5e7eb" },
                      ticks: { color: "#4b5563" },
                    },
                  },
                }}
              />
            </div>

            {/* Loss Chart */}
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <div className="flex items-center space-x-2 mb-4">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                <h2 className="text-xl font-semibold text-gray-800">
                  Loss Metrics
                </h2>
              </div>
              <Line
                data={buildChart(epochs, [
                  {
                    label: "Training Loss",
                    data: chartData.trainLoss,
                    color: "rgb(239,68,68)",
                  },
                  {
                    label: "Validation Loss",
                    data: chartData.valLoss,
                    color: "rgb(251,191,36)",
                  },
                ])}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "top",
                      labels: { color: "#1f2937" },
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: false,
                      grid: { color: "#e5e7eb" },
                      ticks: { color: "#4b5563" },
                    },
                    x: {
                      grid: { color: "#e5e7eb" },
                      ticks: { color: "#4b5563" },
                    },
                  },
                }}
              />
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-10">
            Loading training results...
          </p>
        )}
      </div>
    </div>
  );
};

export default TrainingMetricsChart;
