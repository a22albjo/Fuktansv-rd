import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js plugins
ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

function PointChart(props: { data: any }) {
  const scatterArbitraryLine = {
    id: "scatter-arbitrary-line",
    beforeDraw(chart: any) {
      const ctx = chart.ctx;
      const xAxis = chart.scales.x; // Use "x" for the x-axis
      const yAxis = chart.scales.y; // Use "y" for the y-axis
      let lineColor = "#eedd3323";
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
      lineColor = "#ffaa3323";
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
      lineColor = "#ff000023";
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

  const { data } = props; // Destructure the data prop
  const chartData = {
    datasets: data.datasets, // Extract datasets from the data prop
  };

  const options = {
    scales: {
      x: {
        min: -15,
        max: 50,
        ticks: {
          stepSize: 5,
        },
      },

      y: {
        min: 25,
        max: 100,
        ticks: {
          stepSize: 5,
        },
      },
    },
  };

  const plugins = [scatterArbitraryLine];

  return <Scatter data={chartData} options={options} plugins={plugins} />;
}

export default PointChart;
