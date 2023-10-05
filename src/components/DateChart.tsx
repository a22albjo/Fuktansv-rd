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

  // Check if data is empty or undefined before rendering the chart
  if (!data) {
    return <div>Loading...</div>; // You can customize the loading message here
  }

  const dataPoints = data.map((point: any) => ({
    x: new Date(point.date),
    y: point.temperatur,
    kommentar: point.kommentar,
  }));
  const dataPoints1 = data.map((point: any) => ({
    x: new Date(point.date),
    y: point.luftfuktighet,
    kommentar: point.kommentar,
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
            hour: "MMM D", // Display format for day and month
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
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const x = context.raw.x;
            const y = context.raw.y;
            const kommentar = context.raw.kommentar;

            // Customize the tooltip label to include date and kommentar
            return `Värde: ${y}, Date: ${x}, ${kommentar || ""}`;
          },
        },
      },
      legend: {
        position: "top" as const,
      },
    },
  };

  return <Line options={options} data={chartData} />;
}

export default DateChart;
