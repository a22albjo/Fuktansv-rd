import {
    Chart as ChartJS,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    Tooltip,
  } from "chart.js";
import { useState } from "react";
import { Scatter } from "react-chartjs-2";
  
  // Register Chart.js plugins
  ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);
  
  function CompareMonth(props: { data: any; }) {
    const [month1, setMonth1] = useState<string>("2023-09"); // Default to January
    const [month2, setMonth2] = useState<string>("2024-09"); // Default to February
    const scatterArbitraryLine = {
      id: "scatter-arbitrary-line",
      beforeDraw(chart: any) {
        const ctx = chart.ctx;
        const xAxis = chart.scales.x; // Use "x" for the x-axis
        const yAxis = chart.scales.y; // Use "y" for the y-axis
        let lineColor = "#99aaff23";
        let lineWidth = 3;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(xAxis.getPixelForValue(-1), yAxis.getPixelForValue(100));
        ctx.strokeStyle = lineColor;
        ctx.fillStyle = lineColor;
        ctx.lineWidth = lineWidth;
        ctx.lineTo(xAxis.getPixelForValue(-0.5), yAxis.getPixelForValue(97));
        ctx.lineTo(xAxis.getPixelForValue(0), yAxis.getPixelForValue(95));
        ctx.lineTo(xAxis.getPixelForValue(1), yAxis.getPixelForValue(92.4));
        ctx.lineTo(xAxis.getPixelForValue(2), yAxis.getPixelForValue(90));
        ctx.lineTo(xAxis.getPixelForValue(4), yAxis.getPixelForValue(85));
        ctx.lineTo(xAxis.getPixelForValue(8), yAxis.getPixelForValue(80));
        ctx.lineTo(xAxis.getPixelForValue(10), yAxis.getPixelForValue(78));
        ctx.lineTo(xAxis.getPixelForValue(20), yAxis.getPixelForValue(75));
        ctx.lineTo(xAxis.getPixelForValue(50), yAxis.getPixelForValue(72));
        ctx.lineTo(xAxis.getPixelForValue(50), yAxis.getPixelForValue(100));
        ctx.stroke();
        ctx.fill();
        lineColor = "#5555ff23";
        ctx.fillStyle = lineColor;
        lineWidth = 3;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(xAxis.getPixelForValue(0), yAxis.getPixelForValue(100));
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineWidth;
        ctx.lineTo(xAxis.getPixelForValue(0.5), yAxis.getPixelForValue(97));
        ctx.lineTo(xAxis.getPixelForValue(1), yAxis.getPixelForValue(95));
        ctx.lineTo(xAxis.getPixelForValue(2), yAxis.getPixelForValue(93));
        ctx.lineTo(xAxis.getPixelForValue(4), yAxis.getPixelForValue(90));
        ctx.lineTo(xAxis.getPixelForValue(6), yAxis.getPixelForValue(87.5));
        ctx.lineTo(xAxis.getPixelForValue(8), yAxis.getPixelForValue(86));
        ctx.lineTo(xAxis.getPixelForValue(11), yAxis.getPixelForValue(85));
        ctx.lineTo(xAxis.getPixelForValue(35), yAxis.getPixelForValue(80));
        ctx.lineTo(xAxis.getPixelForValue(50), yAxis.getPixelForValue(78));
        ctx.lineTo(xAxis.getPixelForValue(50), yAxis.getPixelForValue(100));
        ctx.stroke();
        ctx.fill();
        lineColor = "#0000ff23";
        ctx.fillStyle = lineColor;
        lineWidth = 3;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(xAxis.getPixelForValue(1), yAxis.getPixelForValue(100));
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineWidth;
        ctx.lineTo(xAxis.getPixelForValue(1.6), yAxis.getPixelForValue(98));
        ctx.lineTo(xAxis.getPixelForValue(2), yAxis.getPixelForValue(97));
        ctx.lineTo(xAxis.getPixelForValue(3), yAxis.getPixelForValue(95));
        ctx.lineTo(xAxis.getPixelForValue(4), yAxis.getPixelForValue(93.6));
        ctx.lineTo(xAxis.getPixelForValue(5), yAxis.getPixelForValue(92.5));
        ctx.lineTo(xAxis.getPixelForValue(8), yAxis.getPixelForValue(91));
        ctx.lineTo(xAxis.getPixelForValue(12), yAxis.getPixelForValue(90));
        ctx.lineTo(xAxis.getPixelForValue(35), yAxis.getPixelForValue(85));
        ctx.lineTo(xAxis.getPixelForValue(40), yAxis.getPixelForValue(84));
        ctx.lineTo(xAxis.getPixelForValue(50), yAxis.getPixelForValue(83));
        ctx.lineTo(xAxis.getPixelForValue(50), yAxis.getPixelForValue(100));
        ctx.stroke();
        ctx.fill();
        ctx.restore();
      },
    };
  
    const { data } = props; // Destructure data and the two months to compare
  
    const monthsColors = ["#ff0000", "#0000ff"]; // Two distinct colors for comparison
  
    // Check if data is empty or undefined before rendering the chart
    if (!data) {
      return <div>Loading...</div>; // You can customize the loading message here
    }
  
    // Filter data for the two specified months
    const datasets = [month1, month2].map((month, index) => {
      const dataPoints = data
        .filter((point: any) => point.date.slice(0, 7) === month)
        .map((point: any) => ({
          x: point.temperatur,
          y: point.luftfuktighet,
          date: point.date,
          kommentar: point.kommentar,
        }));
  
      return {
        data: dataPoints,
        label: `Month: ${month}`,
        borderColor: monthsColors[index],
        backgroundColor: monthsColors[index] + "55",
      };
    });
  
    const chartData = { datasets };
  
    const options = {
      scales: {
        x: {
          ticks: {
            stepSize: 5,
          },
          title: {
            display: true,
            text: "Temperatur",
          },
        },
        y: {
          ticks: {
            stepSize: 5,
          },
          title: {
            display: true,
            text: "Luftfuktighet",
          },
        },
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: (context: any) => {
              const point = context.parsed;
              const date = context.raw.date;
              const kommentar = context.raw.kommentar;
              if (!point) return "";
  
              // Customize the tooltip label to include date and kommentar
              return `Temperatur: ${point.x}˚c, Luftfuktighet: ${point.y}%, Date: ${date}, ${kommentar || ""}`;
            },
          },
        },
        legend: {
          position: "top" as const,
        },
      },
    };
  
    const plugins = [scatterArbitraryLine];

    return (
      <div>
        <select value={month1} onChange={(e) => setMonth1(e.target.value)}>
        {Array.from(new Set(data.map((dataset: { date: string | any[]; }) => dataset.date.slice(0,7)))).map(
          (uniqueMonth:any, index) => (
            <option key={index} value={uniqueMonth}>
              {uniqueMonth}
            </option>
          )
        )}
      </select>
      <select value={month2} onChange={(e) => setMonth2(e.target.value)}>
        {Array.from(new Set(data.map((dataset: { date: string | any[]; }) => dataset.date.slice(0,7)))).map(
          (uniqueMonth: any, index) => (
            <option key={index} value={uniqueMonth}>
              {uniqueMonth}
            </option>
          )
        )}
      </select>
      <Scatter data={chartData} options={options} plugins={plugins} />
    </div>
    );
  }
  
  export default CompareMonth;
  