import "./App.css";
import PointChart from "./components/PointChart";
import TimeChart from "./components/TimeChart";
import DateChart from "./components/DateChart";

function App() {
  const chartData = {
    datasets: [
      {
        label: "Data points",
        data: [
          { datetime: "2023-09-17 23:04", x: 14.8, y: 67 },
          { datetime: "2023-09-18 06:46", x: 12.8, y: 69 },
          { datetime: "2023-09-18 10:52", x: 14.1, y: 69 },
          { datetime: "2023-09-18 09:36", x: 13.6, y: 69 },
          { datetime: "2023-09-18 11:03", x: 14.3, y: 70 },
          { datetime: "2023-09-18 15:52", x: 17.9, y: 70 },
          { datetime: "2023-09-18 17:01", x: 17.6, y: 70 },
          { datetime: "2023-09-18 17:44", x: 17.3, y: 69 },
          { datetime: "2023-09-18 19:17", x: 16.9, y: 69 },
          { datetime: "2023-09-18 21:11", x: 16.5, y: 71 },
          { datetime: "2023-09-18 21:56", x: 16.5, y: 72 },
          { datetime: "2023-09-18 22:35", x: 16.5, y: 73 },
          { datetime: "2023-09-19 07:39", x: 15.9, y: 78 },
          { datetime: "2023-09-19 08:00", x: 15.9, y: 79 },
          { datetime: "2023-09-19 08:34", x: 16.0, y: 80 },
          { datetime: "2023-09-19 10:39", x: 15.9, y: 75 },
        ],

        backgroundColor: "#00bb00",
      },
    ],
  };

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
