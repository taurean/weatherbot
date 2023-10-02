import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { LocationSearch } from "./component/LocationSearch";
import "./App.css";

import {
  getWeather,
  WeatherResponse,
  getLocation,
  LocationReponse,
} from "./services/WeatherService";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function weatherCodeToString(code: number) {
  switch (code) {
    case 0:
      return "clear sky";
    case 1:
      return "mainly clear";
    case 2:
      return "partly cloudy";
    case 3:
      return "overcast";
    case 45:
    case 48:
      return "fog";
    case 51:
      return "light drizzle";
    case 53:
    case 55:
      return "moderate drizzle";
    case 56:
    case 57:
      return "freezing drizzle";
    case 61:
      return "slight rain";
    case 63:
      return "rain";
    case 65:
      return "heavy rain";
    case 66:
    case 67:
      return "freezing rain";
    case 71:
      return "light snow";
    case 73:
      return "snow";
    case 75:
    case 77:
      return "heavy snow";
    case 80:
      return "slight rain showers";
    case 81:
      return "rain showers";
    case 82:
      return "violent rain showers";
    case 85:
      return "snow showers";
    case 86:
      return "heavy snow showers";
    case 95:
      return "thunderstorm";
    case 96:
      return "thunderstorm with light hail";
    case 99:
      return "thunderstorm with heavy hail";
    default:
      return "unknown";
  }
}

interface WeatherCardProps {
  locationName?: string;
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
          High {prop.tempHighCelsius}ºC - Low {prop.tempLowCelsius}ºC
        </div>
        <div>{prop.condition}</div>
      </div>
    </>
  );
}

function App() {
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [count, setCount] = useState(0);

  const [location, setLocationName] = useState<LocationReponse | null>(null);

  useEffect(() => {
    const fetchLocationData = async () => {
      const searchParam = "emeryville";
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
      <h1>Weatherbot</h1>
      <LocationSearch></LocationSearch>

      {weatherData && location && (
        <WeatherCard
          locationName={location.results.results[0].name}
          tempCurrentCelsius={weatherData.hourly.temperature_2m[0]}
          tempHighCelsius={weatherData.daily.temperature_2m_max[0]}
          tempLowCelsius={weatherData.daily.temperature_2m_min[0]}
          condition={weatherCodeToString(weatherData.hourly.weathercode[0])}
        />
      )}
    </>
  );
}

export default App;
