import "./App.css";

function App() {
  return (
    <>
      <h1>
        <u>Fukt</u>ansvärt
      </h1>
      <div className="card">
        <label htmlFor="">
          Luftfuktighet %
          <input placeholder="70" type="number" />
        </label>
      </div>
      <div className="card">
        <label htmlFor="">
          Temperatur °C
          <input placeholder="10" type="number" />
        </label>
      </div>
      <button>Logga</button>
    </>
  );
}

export default App;
