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
  kommentar?: string;
};

function App() {
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
          x: entry.temperatur, // Map 'temperatur' to 'x'
          y: entry.luftfuktighet, // Map 'luftfuktighet' to 'y'
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
          luftfuktighet: "",
          temperatur: "",
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
          x: entry.temperatur, // Map 'temperatur' to 'x'
          y: entry.luftfuktighet, // Map 'luftfuktighet' to 'y'
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
      </div>
    </>
  );
}

export default App;
