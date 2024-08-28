import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  CategoryScale,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";

ChartJS.register(TimeScale, LinearScale, Title, Tooltip, Legend, PointElement, LineElement, CategoryScale);

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

  // Group data points by day and calculate daily averages
  const dailyAverages: {
    [key: string]: {
      temperaturSum: number;
      luftfuktighetSum: number;
      count: number;
    };
  } = {};

  data.forEach((point: any) => {
    const date = new Date(point.date);
    const day = date.toDateString(); // Get the date string (e.g., "Mon Oct 06 2023")

    // Initialize daily average objects if they don't exist
    if (!dailyAverages[day]) {
      dailyAverages[day] = {
        temperaturSum: 0,
        luftfuktighetSum: 0,
        count: 0,
      };
    }

    // Add data to daily average calculations
    dailyAverages[day].temperaturSum += point.temperatur;
    dailyAverages[day].luftfuktighetSum += point.luftfuktighet;
    dailyAverages[day].count += 1;
  });

  // Create an array of data points for the daily averages
  const dailyAverageData = Object.keys(dailyAverages).map((day) => {
    const averageTemperatur =
      dailyAverages[day].temperaturSum / dailyAverages[day].count;
    const averageLuftfuktighet =
      dailyAverages[day].luftfuktighetSum / dailyAverages[day].count;

    return {
      x: new Date(day),
      y: averageTemperatur,
      luftfuktighet: averageLuftfuktighet,
    };
  });

  const dailyAverageData1 = Object.keys(dailyAverages).map((day) => {
    const averageTemperatur =
      dailyAverages[day].temperaturSum / dailyAverages[day].count;
    const averageLuftfuktighet =
      dailyAverages[day].luftfuktighetSum / dailyAverages[day].count;

    return {
      x: new Date(day),
      y: averageLuftfuktighet,
      temperatur: averageTemperatur,
    };
  });

  const chartData = {
    datasets: [
      {
        data: dataPoints,
        label: "Temperatur",
        borderColor: "rgba(255, 55, 55, 1)",
        backgroundColor: "rgba(255, 55, 55, 0.2)",
        pointRadius: 2,
        tension: 0.3,
      },
      {
        data: dataPoints1,
        label: "Luftfuktighet",
        borderColor: "rgba(15, 55, 255, 1)",
        backgroundColor: "rgba(15, 55, 255, 0.2)",
        pointRadius: 2,
        tension: 0.3,
      },
      {
        data: dailyAverageData,
        label: "Average Temperatur",
        borderColor: "rgba(255, 55, 55, 0.6)",
        backgroundColor: "rgba(255, 55, 55, 0.2)",
        pointRadius: 3,
        tension: 0.4,
      },
      {
        data: dailyAverageData1,
        label: "Average Luftfuktighet",
        borderColor: "rgba(15, 55, 255, 0.6)",
        backgroundColor: "rgba(15, 55, 255, 0.2)",
        pointRadius: 3,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        type: "time" as const, // Corrected to use the "time" scale type
        time: {
          unit: "day" as const, // Explicitly type the unit as one of the allowed literals
          displayFormats: {
            day: "MMM d", // Correct display format for day
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
