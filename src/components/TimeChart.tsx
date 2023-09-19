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

function TimeChart(props: { data: any }) {
  const { data } = props; // Destructure the data prop

  const dataPoints = data.datasets[0].data.map((point: any) => ({
    x: new Date("2000-01-01 " + point.datetime.slice(-5, -1)),
    y: point.x,
  }));
  const dataPoints1 = data.datasets[0].data.map((point: any) => ({
    x: new Date("2000-01-01 " + point.datetime.slice(-5, -1)),
    y: point.y,
  }));

  const chartData = {
    datasets: [
      {
        data: dataPoints,
        label: "Temperatur",
        borderColor: "rgba(255, 55, 55, 0.2)",
        backgroundColor: "rgba(255, 55, 55, 0.8)",
      },
      {
        data: dataPoints1,
        label: "Luftfuktighet",
        borderColor: "rgba(15, 55, 255, 0.2)",
        backgroundColor: "rgba(15, 55, 255, 0.8)",
      },
    ], // Extract datasets from the data prop
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        type: "time",
        time: {
          unit: "hour", // You can adjust the time unit as needed (e.g., "day", "minute", etc.)
          displayFormats: {
            hour: "HH:mm", // Display format for hours and minutes
          },
        },
        title: {
          display: true,
          text: "Time",
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

export default TimeChart;
