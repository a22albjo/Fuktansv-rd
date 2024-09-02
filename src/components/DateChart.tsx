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

  // Normalize the date to the same base year (e.g., 1970)
  const normalizeDate = (date: Date) => {
    return new Date(1970, date.getMonth(), date.getDate());
  };

  // Initialize an object to group data by year for both Temperatur and Luftfuktighet
  const groupedData: { [year: string]: { temperatur: any[]; luftfuktighet: any[] } } = {};

  data.forEach((point: any) => {
    const date = new Date(point.date);
    const year = date.getFullYear();

    // Initialize the year object if it doesn't exist
    if (!groupedData[year]) {
      groupedData[year] = { temperatur: [], luftfuktighet: [] };
    }

    // Normalize the date to ignore the year
    const normalizedDate = normalizeDate(date);

    // Add data points to the respective arrays for each year
    groupedData[year].temperatur.push({
      x: normalizedDate,
      y: point.temperatur,
      kommentar: point.kommentar,
    });

    groupedData[year].luftfuktighet.push({
      x: normalizedDate,
      y: point.luftfuktighet,
      kommentar: point.kommentar,
    });
  });

  // Create datasets dynamically for each year and each data type (Temperatur and Luftfuktighet)
  const datasets = Object.keys(groupedData).flatMap((year) => [
    {
      data: groupedData[year].temperatur,
      label: `Temperatur ${year}`,
      borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
        Math.random() * 255
      )}, ${Math.floor(Math.random() * 255)}, 1)`, // Random color for each year's Temperatur
      backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
        Math.random() * 255
      )}, ${Math.floor(Math.random() * 255)}, 0.2)`,
      pointRadius: 2,
      tension: 0.3,
    },
    {
      data: groupedData[year].luftfuktighet,
      label: `Luftfuktighet ${year}`,
      borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
        Math.random() * 255
      )}, ${Math.floor(Math.random() * 255)}, 1)`, // Random color for each year's Luftfuktighet
      backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
        Math.random() * 255
      )}, ${Math.floor(Math.random() * 255)}, 0.2)`,
      pointRadius: 2,
      tension: 0.3,
    },
  ]);

  const chartData = {
    datasets,
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        type: "time" as const,
        time: {
          unit: "month" as const,
          displayFormats: {
            month: "MMM", // Display only the month
            day: "MMM d", // To show both month and day in tooltips
          },
          tooltipFormat: "MMM d", // Tooltip shows day and month
        },
        title: {
          display: true,
          text: "Month and Day",
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
