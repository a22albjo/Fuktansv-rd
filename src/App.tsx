import "./App.css";
import { useState, useEffect } from "react";
import PointChart from "./components/PointChart";
import TimeChart from "./components/TimeChart";
import DateChart from "./components/DateChart";
import Table from "./components/Table";
import CompareMonth from "./components/CompareMonth";

// Define a type for your data point
type DataPoint = {
  date: string;
  temperatur: number;
  luftfuktighet: number;
  kommentar?: string;
};

function App() {
  const [month1, setMonth1] = useState<string>("01"); // Default to January
  const [month2, setMonth2] = useState<string>("02"); // Default to February
  const [chartData, setChartData] = useState<DataPoint[]>([]);
  const [formData, setFormData] = useState({
    luftfuktighet: "65",
    temperatur: "15.0",
    kommentar: "",
  });

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
          temperatur: entry.temperatur, // Map 'temperatur' to 'x'
          luftfuktighet: entry.luftfuktighet, // Map 'luftfuktighet' to 'y'
          kommentar: entry.kommentar,
        }));

        setChartData(transformedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Send a POST request with formData to the server
    fetch("http://localhost:3001/api/newData", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Clear the form after a successful submission
        setFormData({
          luftfuktighet: "65",
          temperatur: "15.0",
          kommentar: "",
        });
        // Fetch the updated data from the server
        return fetch("http://localhost:3001/api/data");
      })
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
          temperatur: entry.temperatur, // Map 'temperatur' to 'x'
          luftfuktighet: entry.luftfuktighet, // Map 'luftfuktighet' to 'y'
          kommentar: entry.kommentar,
        }));

        setChartData(transformedData);
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
      });
  };

  return (
    <>
      <h1>
        <u>Fukt</u>ansvärt
      </h1>
      <div>
        <form className="card" onSubmit={handleSubmit}>
          <label htmlFor="">
            Luftfuktighet %
            <input
              name="luftfuktighet"
              id="luftfuktighet"
              type="number"
              onChange={handleInputChange}
              value={formData.luftfuktighet}
              min={0}
              max={110}
            />
          </label>

          <label htmlFor="">
            Temperatur °C
            <input
              name="temperatur"
              id="temperatur"
              type="number"
              onChange={handleInputChange}
              value={formData.temperatur}
              min={-30}
              max={60}
              step={0.1}
            />
          </label>
          <label htmlFor="">
            Kommentar
            <input
              name="kommentar"
              id="kommentar"
              onChange={handleInputChange}
              value={formData.kommentar}
              type="text"
            />
          </label>
          <button type="submit">Logga</button>
        </form>
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
        <div className="chartContainer">
        <select value={month1} onChange={(e) => setMonth1(e.target.value)}>
          {Array.from(new Set(chartData.map((dataset) => dataset.date.slice(0,7)))).map(
            (uniqueMonth, index) => (
              <option key={index} value={uniqueMonth}>
                {uniqueMonth}
              </option>
            )
          )}
        </select>
        <select value={month2} onChange={(e) => setMonth2(e.target.value)}>
          {Array.from(new Set(chartData.map((dataset) => dataset.date.slice(0,7)))).map(
            (uniqueMonth, index) => (
              <option key={index} value={uniqueMonth}>
                {uniqueMonth}
              </option>
            )
          )}
        </select>
          <CompareMonth data={chartData} month1={month1} month2={month2} />
        </div>
        <div className="tableContainer">
          <Table data={chartData} />
        </div>
      </div>
    </>
  );
}

export default App;
