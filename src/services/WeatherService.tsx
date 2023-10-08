import { useState, useEffect } from "react";
const GEO_API_URL = `https://geocoding-api.open-meteo.com/v1/search?`;
const WEATHER_API_URL = `https://api.open-meteo.com/v1/forecast?`;
import { CardLocation } from "../App";

const USE_MOCK = true;
export interface LocationResponceItem {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1: string;
  admin2: string;
  timezone: string;
}

export type LocationReponse = LocationResponceItem[];

export interface ErrorResponse {
  error: boolean;
  reason: string;
}

export interface WeatherResponse {
  hourly: {
    time: string[];
    temperature_2m: number[];
    precipitation_probability: number[];
    weathercode: number[];
  };
  daily: {
    time: string[];
    weathercode: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
}

async function getLocationMock(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _searchParam: string
): Promise<LocationReponse | ErrorResponse> {
  return [
    {
      id: 5405380,
      name: "Vallejo",
      latitude: 38.10409,
      longitude: -122.25664,
      timezone: "America/Los_Angeles",
      country: "United States",
      admin1: "California",
      admin2: "Solano",
    },
  ];
}

async function _getLocation(
  searchParam: string
): Promise<LocationReponse | ErrorResponse> {
  try {
    const response = await fetch(
      `${GEO_API_URL}name=${searchParam}&count10&language=en&format=json`
    );
    if (response.ok) {
      const results = await response.json();
      return results.results;
    }
    if (response.status == 404 || response.status == 500) {
      const error = await response.json();
      return error;
    }
    throw new Error("network response was not ok");
  } catch (error) {
    return { error: true, reason: (error as Error).message };
  }
}

export const getLocation = USE_MOCK ? getLocationMock : _getLocation;

export async function getWeather(
  latitude: number,
  longitude: number
): Promise<WeatherResponse | ErrorResponse> {
  try {
    const response = await fetch(
      `${WEATHER_API_URL}latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,precipitation_probability,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto`
    );
    if (response.ok) {
      const apiResult = await response.json();
      return apiResult;
    }
    if (response.status === 404 || response.status === 500) {
      const error = await response.json();
      return error;
    }
    throw new Error("network response was not ok");
  } catch (error) {
    return { error: true, reason: (error as Error).message };
  }
}

export function useWeather(location: CardLocation | null) {
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      if (location) {
        const { latitude, longitude } = location;
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
