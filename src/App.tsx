import { useState, useEffect } from "react";
import { LocationSearch } from "./component/locationSearch/LocationSearch";
import "./App.css";
import { WeatherCard } from "./component/WeatherCard/WeatherCard";
import { SettingsModal } from "./component/SettingsModal/SettingsModal";

import {
  getWeather,
  WeatherResponse,
  getLocation,
  LocationReponse,
} from "./services/WeatherService";

function App() {
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);

  const [location, setLocationName] = useState<LocationReponse | null>(null);

  useEffect(() => {
    const fetchLocationData = async () => {
      const searchParam = "vallejo";
      const returnedData = await getLocation(searchParam);
      if (!("error" in returnedData)) {
        setLocationName(returnedData);
      }
    };
    fetchLocationData();
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      if (location) {
        const latitude = location.results.results[0].latitude; // provided latitude
        const longitude = location.results.results[0].longitude; // provided longitude
        const data = await getWeather(latitude, longitude);
        if (!("error" in data)) {
          setWeatherData(data);
        }
      }
    };
    fetchWeather();
  }, [location]);

  return (
    <>
      <header className="rootHeading">
        <h1 className="rootHeadingTitle">Weatherbot</h1>
        <SettingsModal />
      </header>
      <main className="u-container">
        {/* <LocationSearch></LocationSearch> */}
        <section className="u-grid">
          {weatherData && location && (
            <WeatherCard
              locationName={location.results.results[0].name}
              tempCurrentCelsius={weatherData.hourly.temperature_2m[0]}
              tempHighCelsius={weatherData.daily.temperature_2m_max[0]}
              tempLowCelsius={weatherData.daily.temperature_2m_min[0]}
              condition={weatherData.hourly.weathercode[0]}
              prefersFehrenheit={true}
            />
          )}
        </section>
      </main>
    </>
  );
}

export default App;
