import React from "react";
import Chart from "react-apexcharts";

interface DashboardChartProps {
  labels: string[];
  incomeData: number[];
  expenseData: number[];
  type?: "line" | "area";
  height?: number;
  xAxisType?: "category" | "datetime";
}

const DashboardChart: React.FC<DashboardChartProps> = ({
  labels = [],
  incomeData = [],
  expenseData = [],
  type = "line",
  height = 300,
  xAxisType = "category",
}) => {
  const options: ApexCharts.ApexOptions = {
    chart: {
      type,
      toolbar: { show: true },
      zoom: { enabled: false },
    },
    xaxis: {
      type: xAxisType,
      categories: xAxisType === "category" ? labels : undefined,
      labels: { rotate: -45 },
    },
    tooltip: { enabled: true },
    legend: { show: true },
  };

  const series = [
    { name: "Income", data: incomeData },
    { name: "Expense", data: expenseData },
  ];

  return <Chart options={options} series={series} type={type} height={height} />;
};

export default DashboardChart;
