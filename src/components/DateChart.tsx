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
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

ChartJS.register(TimeScale, LinearScale, Title, Tooltip, Legend, PointElement, LineElement, CategoryScale);

function DateChart(props: { data: any }) {
  const { data } = props; // Destructure the data prop

  // Local state to hold the data from the API and date range
  const [apiData, setApiData] = useState<any[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    // Fetch data from your /api/SMHIdata endpoint
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/SMHIdata');
        const result = await response.json();
        setApiData(result);
      } catch (error) {
        console.error('Error fetching SMHI data:', error);
      }
    };

    fetchData();
  }, []);

  // Check if data or apiData is empty or undefined before rendering the chart
  if (!data || !apiData.length) {
    return <div>Loading...</div>;
  }

  // Filter data based on selected date range
  const filterDataByDateRange = (dataset: any[], startDate: Date | null, endDate: Date | null) => {
    if (!startDate || !endDate) return dataset; // If no date range is selected, return the full dataset

    return dataset.filter((point) => {
      const pointDate = new Date(point.x);
      return pointDate >= startDate && pointDate <= endDate;
    });
  };

  // Normalize the date to the same base year (e.g., 1970)
  const normalizeDate = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes());
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
      data: filterDataByDateRange(groupedData[year].temperatur, startDate, endDate),
      label: `Vind temperatur ${year}`,
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
      data: filterDataByDateRange(groupedData[year].luftfuktighet, startDate, endDate),
      label: `Vind luftfuktighet ${year}`,
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

  // Process and add the API data as an additional dataset with a semi-transparent color
  const apiDataset = [
    {
      data: filterDataByDateRange(
        apiData.map((point: any) => ({
          x: new Date(point.date), // No need to normalize here since we want real-time plotting
          y: point.temperatur,
        })),
        startDate,
        endDate
      ),
      label: "Ute Temperatur",
      borderColor: "rgba(255, 99, 132, 1)", // Set a specific color for API data
      backgroundColor: "rgba(255, 99, 132, 0.2)", // Semi-transparent background
      pointRadius: 2,
      tension: 0.3,
    },
    {
      data: filterDataByDateRange(
        apiData.map((point: any) => ({
          x: new Date(point.date),
          y: point.luftfuktighet,
        })),
        startDate,
        endDate
      ),
      label: "Ute Luftfuktighet",
      borderColor: "rgba(54, 162, 235, 1)", // Set a specific color for API data
      backgroundColor: "rgba(54, 162, 235, 0.2)", // Semi-transparent background
      pointRadius: 2,
      tension: 0.3,
    },
  ];

  // Merge the existing datasets with the API datasets
  const chartData = {
    datasets: [...datasets, ...apiDataset],
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

  return (
    <div>
      {/* Date range picker */}
      <div style={{ marginBottom: '20px' }}>
        <label>Select Start Date: </label>
        <DatePicker
          selected={startDate}
          onChange={(date: Date | null) => setStartDate(date)}
          dateFormat="yyyy-MM-dd"
        />
        <label>Select End Date: </label>
        <DatePicker
          selected={endDate}
          onChange={(date: Date | null) => setEndDate(date)}
          dateFormat="yyyy-MM-dd"
        />
      </div>

      {/* Line Chart */}
      <Line options={options} data={chartData} />
    </div>
  );
}

export default DateChart;
