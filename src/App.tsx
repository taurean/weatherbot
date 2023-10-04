import { useState, useEffect } from "react";
import "./App.css";

import { FToggle } from "./component/FToggle/FToggle";
import { WeatherCard } from "./component/WeatherCard/WeatherCard";

import {
  getWeather,
  WeatherResponse,
  getLocation,
  LocationReponse,
} from "./services/WeatherService";

function useWeather(location: LocationReponse | null) {
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      if (location) {
        const latitude = location.results.results[0].latitude;
        const longitude = location.results.results[0].longitude;
        const data = await getWeather(latitude, longitude);
        if (!("error" in data)) {
          setWeatherData(data);
        }
      }
    };
    fetchWeather();
  }, [location]);

  return weatherData;
}

export type UnitPreference = "fahrenheit" | "celsius";

const localStorageResponse = localStorage.getItem("useFahrenheit");
let initialUnitPreference = localStorageResponse as UnitPreference;

if (localStorageResponse === null) {
  initialUnitPreference = "celsius";
}

console.log(initialUnitPreference, localStorageResponse);

function App() {
  const [location, setLocationName] = useState<LocationReponse | null>(null);

  useEffect(() => {
    const fetchLocationData = async () => {
      const searchParam = "sao paulo";
      const returnedData = await getLocation(searchParam);
      if (!("error" in returnedData)) {
        setLocationName(returnedData);
      }
    };
    fetchLocationData();
  }, []);

  const weatherData = useWeather(location);

  const [isExpanded, setIsExpanded] = useState(false);

  const [unitPreference, setUnitPreference] = useState(initialUnitPreference);

  function togglePreference(nextPreference: UnitPreference) {
    setUnitPreference(nextPreference);
    localStorage.setItem("useFahrenheit", nextPreference);
    console.log(`preference toggled`);
  }
  // End of Unit Preference

  return (
    <>
      <header className="rootHeading">
        <h1 className="rootHeadingTitle">Weatherbot</h1>
        <FToggle
          currentValue={unitPreference}
          setPreferredValue={togglePreference}
        />
      </header>
      <main className="u-container">
        <section className="u-grid">
          {weatherData && location && (
            <WeatherCard
              locationName={location.results.results[0].name}
              tempCurrentCelsius={weatherData.hourly.temperature_2m[0]}
              tempHighCelsius={weatherData.daily.temperature_2m_max[0]}
              tempLowCelsius={weatherData.daily.temperature_2m_min[0]}
              condition={weatherData.hourly.weathercode[0]}
              prefersFehrenheit={unitPreference == "fahrenheit"}
              isExpanded={isExpanded}
              setIsExpanded={setIsExpanded}
            />
          )}
        </section>
      </main>
    </>
  );
}

export default App;
