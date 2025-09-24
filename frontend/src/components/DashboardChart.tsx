import React from "react";
import Chart from "react-apexcharts";

interface DashboardChartProps {
  labels: string[];          // X-axis labels (e.g., months or week days)
  incomeData: number[];      // Income amounts
  expenseData: number[];     // Expense amounts
  type?: "bar" | "line";     // Chart type: bar (default) or line
  height?: number;           // Chart height
}

const DashboardChart = ({
  labels,
  incomeData,
  expenseData,
  type = "bar",
  height = 300,
}: DashboardChartProps) => {
  const options: ApexCharts.ApexOptions = {
    chart: {
      id: "income-expense",
      toolbar: { show: false },
      background: "transparent",
    },
    colors: ["#22c55e", "#ef4444"], // green = income, red = expense
    xaxis: {
      categories: labels,
      labels: { style: { colors: "#6b7280" } }, // Tailwind gray
    },
    dataLabels: { enabled: true },
    tooltip: { enabled: true },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    plotOptions: type === "bar" ? {
      bar: {
        borderRadius: 8,
        horizontal: false,
        columnWidth: "50%",
      },
    } : undefined,
  };

  const series = [
    { name: "Income", data: incomeData },
    { name: "Expense", data: expenseData },
  ];

  return <Chart options={options} series={series} type={type} height={height} />;
};

export default DashboardChart;
