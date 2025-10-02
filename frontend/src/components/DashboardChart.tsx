import Chart from "react-apexcharts";

interface DashboardChartProps {
  labels: string[];
  incomeData: number[];
  expenseData: number[];
  type?: "line"; 
  height?: number;
}

const DashboardChart = ({
  labels,
  incomeData,
  expenseData,
  type = "line",
  height = 300,
}: DashboardChartProps) => {
  const options: ApexCharts.ApexOptions = {
    chart: {
      id: "income-expense",
      toolbar: { show: false },
      background: "transparent",
      zoom: { enabled: false },
    },
    colors: ["#22c55e", "#ef4444"],
    xaxis: {
      categories: labels,
      labels: { style: { colors: "#6b7280" } },
    },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", width: 3 },
    tooltip: { enabled: true },
    markers: { size: 5 },
    grid: { borderColor: "#e5e7eb", strokeDashArray: 5 },
  };

  const series = [
    { name: "Income", data: incomeData },
    { name: "Expense", data: expenseData },
  ];

  return <Chart options={options} series={series} type={type} height={height} />;
};

export default DashboardChart;
