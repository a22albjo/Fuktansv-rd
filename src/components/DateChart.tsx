import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
ChartJS.register(TimeScale, LinearScale, Title, Tooltip, Legend);

function DateChart(props: { data: any }) {
  const { data } = props; // Destructure the data prop

  const dataPoints = data.datasets[0].data.map((point: any) => ({
    x: new Date(point.datetime),
    y: point.x,
  }));
  const dataPoints1 = data.datasets[0].data.map((point: any) => ({
    x: new Date(point.datetime),
    y: point.y,
  }));

  const chartData = {
    datasets: [
      {
        data: dataPoints,
        label: "Temperatur",
        borderColor: "rgba(255, 55, 55, 1)",
        backgroundColor: "rgba(255, 55, 55, 0.2)",
      },
      {
        data: dataPoints1,
        label: "Luftfuktighet",
        borderColor: "rgba(15, 55, 255, 1)",
        backgroundColor: "rgba(15, 55, 255, 0.2)",
      },
    ], // Extract datasets from the data prop
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day", // You can adjust the time unit as needed (e.g., "day", "minute", etc.)
          displayFormats: {
            hour: "MMM D", // // Display format for day and month
          },
        },
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Value",
        },
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  return <Line options={options} data={chartData} />;
}

export default DateChart;
