import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface AdmissionsChartProps {
  data: number[];
}

const AdmissionsChart = ({ data }: AdmissionsChartProps) => {
  const options: ApexOptions = {
    chart: {
      id: 'admissions',
      toolbar: { show: false },
      background: 'transparent',
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      labels: { style: { colors: '#6b7280' } },
    },
    dataLabels: { enabled: false },
    stroke: { 
      curve: 'smooth' as const, // ✅ cast as literal type
      width: 3 
    },
    colors: ['#3b82f6'],
    tooltip: { enabled: true },
  };

  const series = [
    { name: 'Admissions', data },
  ];

  return <Chart options={options} series={series} type="line" height={250} />;
};

export default AdmissionsChart;
