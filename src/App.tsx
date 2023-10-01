import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

interface WeatherCardProps {
  locationName: string;
  tempCurrentCelsius: number;
  tempHighCelsius: number;
  tempLowCelsius: number;
  condition: string;
}

function WeatherCard(prop: WeatherCardProps) {
  return (
    <>
      <div>
        <h2>{prop.locationName}</h2>
        <div>{prop.tempCurrentCelsius}</div>
        <div>
          {prop.tempHighCelsius} {prop.tempLowCelsius}
        </div>
        <div>{prop.condition}</div>
      </div>
    </>
  );
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Weatherbot</h1>
      <WeatherCard
        locationName="location name"
        tempCurrentCelsius={90}
        tempHighCelsius={100}
        tempLowCelsius={70}
        condition="sunny"
      />
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
