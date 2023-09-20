import "./App.css";
import { useState, useEffect } from "react";
import PointChart from "./components/PointChart";
import TimeChart from "./components/TimeChart";
import DateChart from "./components/DateChart";

// Define a type for your data point
type DataPoint = {
  date: string;
  x: number;
  y: number;
};

function App() {
  const [chartData, setChartData] = useState<DataPoint[]>([]);

  useEffect(() => {
    // Fetch data from the server
    fetch("http://localhost:3001/api/data") // Replace with your server endpoint
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Transform the data into the expected format
        const transformedData = data.map((entry: any) => ({
          date: entry.date,
          x: entry.temperatur, // Map 'temperatur' to 'x'
          y: entry.luftfuktighet, // Map 'luftfuktighet' to 'y'
        }));

        setChartData(transformedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <h1>
        <u>Fukt</u>ansvärt
      </h1>
      <div>
        <div className="card">
          <label htmlFor="">
            Luftfuktighet %
            <input placeholder="70" max={110} type="number" />
          </label>

          <label htmlFor="">
            Temperatur °C
            <input placeholder="10" type="number" />
          </label>
          <button>Logga</button>
        </div>
      </div>
      <div style={{ width: "800px", height: "600px" }}>
        <div className="chartContainer">
          <PointChart data={chartData} />
        </div>
        <div className="chartContainer">
          <DateChart data={chartData} />
        </div>
        <div className="chartContainer">
          <TimeChart data={chartData} />
        </div>
      </div>
    </>
  );
}

export default App;
