import { useState, useEffect } from "react";
const GEO_API_URL = `https://geocoding-api.open-meteo.com/v1/search?`;
const WEATHER_API_URL = `https://api.open-meteo.com/v1/forecast?`;
import { CardLocation } from "../App";

const USE_MOCK = false;
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

export async function _getWeather(
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

async function getWeatherMock(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _latitude: number,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _longitude: number
): Promise<WeatherResponse | ErrorResponse> {
  return {
    hourly: {
      time: [
        "2023-10-08T00:00",
        "2023-10-08T01:00",
        "2023-10-08T02:00",
        "2023-10-08T03:00",
        "2023-10-08T04:00",
        "2023-10-08T05:00",
        "2023-10-08T06:00",
        "2023-10-08T07:00",
        "2023-10-08T08:00",
        "2023-10-08T09:00",
        "2023-10-08T10:00",
        "2023-10-08T11:00",
        "2023-10-08T12:00",
        "2023-10-08T13:00",
        "2023-10-08T14:00",
        "2023-10-08T15:00",
        "2023-10-08T16:00",
        "2023-10-08T17:00",
        "2023-10-08T18:00",
        "2023-10-08T19:00",
        "2023-10-08T20:00",
        "2023-10-08T21:00",
        "2023-10-08T22:00",
        "2023-10-08T23:00",
        "2023-10-09T00:00",
        "2023-10-09T01:00",
        "2023-10-09T02:00",
        "2023-10-09T03:00",
        "2023-10-09T04:00",
        "2023-10-09T05:00",
        "2023-10-09T06:00",
        "2023-10-09T07:00",
        "2023-10-09T08:00",
        "2023-10-09T09:00",
        "2023-10-09T10:00",
        "2023-10-09T11:00",
        "2023-10-09T12:00",
        "2023-10-09T13:00",
        "2023-10-09T14:00",
        "2023-10-09T15:00",
        "2023-10-09T16:00",
        "2023-10-09T17:00",
        "2023-10-09T18:00",
        "2023-10-09T19:00",
        "2023-10-09T20:00",
        "2023-10-09T21:00",
        "2023-10-09T22:00",
        "2023-10-09T23:00",
        "2023-10-10T00:00",
        "2023-10-10T01:00",
        "2023-10-10T02:00",
        "2023-10-10T03:00",
        "2023-10-10T04:00",
        "2023-10-10T05:00",
        "2023-10-10T06:00",
        "2023-10-10T07:00",
        "2023-10-10T08:00",
        "2023-10-10T09:00",
        "2023-10-10T10:00",
        "2023-10-10T11:00",
        "2023-10-10T12:00",
        "2023-10-10T13:00",
        "2023-10-10T14:00",
        "2023-10-10T15:00",
        "2023-10-10T16:00",
        "2023-10-10T17:00",
        "2023-10-10T18:00",
        "2023-10-10T19:00",
        "2023-10-10T20:00",
        "2023-10-10T21:00",
        "2023-10-10T22:00",
        "2023-10-10T23:00",
        "2023-10-11T00:00",
        "2023-10-11T01:00",
        "2023-10-11T02:00",
        "2023-10-11T03:00",
        "2023-10-11T04:00",
        "2023-10-11T05:00",
        "2023-10-11T06:00",
        "2023-10-11T07:00",
        "2023-10-11T08:00",
        "2023-10-11T09:00",
        "2023-10-11T10:00",
        "2023-10-11T11:00",
        "2023-10-11T12:00",
        "2023-10-11T13:00",
        "2023-10-11T14:00",
        "2023-10-11T15:00",
        "2023-10-11T16:00",
        "2023-10-11T17:00",
        "2023-10-11T18:00",
        "2023-10-11T19:00",
        "2023-10-11T20:00",
        "2023-10-11T21:00",
        "2023-10-11T22:00",
        "2023-10-11T23:00",
        "2023-10-12T00:00",
        "2023-10-12T01:00",
        "2023-10-12T02:00",
        "2023-10-12T03:00",
        "2023-10-12T04:00",
        "2023-10-12T05:00",
        "2023-10-12T06:00",
        "2023-10-12T07:00",
        "2023-10-12T08:00",
        "2023-10-12T09:00",
        "2023-10-12T10:00",
        "2023-10-12T11:00",
        "2023-10-12T12:00",
        "2023-10-12T13:00",
        "2023-10-12T14:00",
        "2023-10-12T15:00",
        "2023-10-12T16:00",
        "2023-10-12T17:00",
        "2023-10-12T18:00",
        "2023-10-12T19:00",
        "2023-10-12T20:00",
        "2023-10-12T21:00",
        "2023-10-12T22:00",
        "2023-10-12T23:00",
        "2023-10-13T00:00",
        "2023-10-13T01:00",
        "2023-10-13T02:00",
        "2023-10-13T03:00",
        "2023-10-13T04:00",
        "2023-10-13T05:00",
        "2023-10-13T06:00",
        "2023-10-13T07:00",
        "2023-10-13T08:00",
        "2023-10-13T09:00",
        "2023-10-13T10:00",
        "2023-10-13T11:00",
        "2023-10-13T12:00",
        "2023-10-13T13:00",
        "2023-10-13T14:00",
        "2023-10-13T15:00",
        "2023-10-13T16:00",
        "2023-10-13T17:00",
        "2023-10-13T18:00",
        "2023-10-13T19:00",
        "2023-10-13T20:00",
        "2023-10-13T21:00",
        "2023-10-13T22:00",
        "2023-10-13T23:00",
        "2023-10-14T00:00",
        "2023-10-14T01:00",
        "2023-10-14T02:00",
        "2023-10-14T03:00",
        "2023-10-14T04:00",
        "2023-10-14T05:00",
        "2023-10-14T06:00",
        "2023-10-14T07:00",
        "2023-10-14T08:00",
        "2023-10-14T09:00",
        "2023-10-14T10:00",
        "2023-10-14T11:00",
        "2023-10-14T12:00",
        "2023-10-14T13:00",
        "2023-10-14T14:00",
        "2023-10-14T15:00",
        "2023-10-14T16:00",
        "2023-10-14T17:00",
        "2023-10-14T18:00",
        "2023-10-14T19:00",
        "2023-10-14T20:00",
        "2023-10-14T21:00",
        "2023-10-14T22:00",
        "2023-10-14T23:00",
      ],
      temperature_2m: [
        16.8, 16.7, 16.2, 16.4, 16.0, 15.3, 14.3, 14.1, 14.2, 15.1, 16.6, 18.5,
        20.0, 20.0, 22.1, 22.9, 23.6, 22.2, 22.5, 21.5, 21.0, 20.2, 20.5, 20.5,
        20.4, 20.1, 19.2, 18.1, 18.8, 18.5, 17.9, 16.9, 17.0, 16.3, 17.5, 17.0,
        18.2, 20.7, 21.2, 21.5, 21.4, 21.2, 21.2, 21.7, 20.5, 19.7, 19.5, 18.6,
        19.6, 16.7, 16.8, 19.7, 21.6, 21.5, 21.2, 21.4, 19.0, 20.1, 21.0, 21.1,
        20.1, 19.7, 19.8, 20.1, 19.9, 19.3, 19.0, 19.2, 19.0, 19.0, 18.7, 18.3,
        17.9, 17.5, 17.1, 16.6, 15.7, 13.6, 13.3, 13.2, 10.2, 10.0, 10.5, 11.1,
        11.8, 12.3, 12.8, 13.0, 13.3, 13.3, 12.8, 11.8, 11.1, 10.8, 10.6, 10.4,
        10.3, 10.2, 10.0, 9.7, 9.5, 9.0, 8.8, 8.7, 4.5, 5.5, 6.9, 8.9, 11.2,
        12.8, 13.4, 13.4, 13.2, 13.0, 12.6, 12.3, 12.1, 12.0, 12.1, 12.4, 12.9,
        13.3, 13.4, 13.4, 13.4, 13.5, 13.5, 13.5, 13.5, 13.5, 13.4, 13.2, 12.9,
        12.8, 13.3, 13.9, 14.1, 13.5, 12.4, 11.4, 10.5, 9.7, 9.1, 8.6, 8.2, 7.9,
        7.6, 7.3, 7.3, 7.4, 7.7, 8.1, 8.5, 9.1, 9.7, 10.7, 11.7, 12.5, 12.8,
        12.8, 12.6, 12.3, 11.7, 11.2, 10.9, 10.6, 10.3, 10.0,
      ],
      precipitation_probability: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 4, 6, 7, 9, 10, 9, 7, 6, 6, 6, 6,
        12, 17, 23, 29, 36, 42, 56, 70, 84, 83, 82, 81, 74, 68, 61, 49, 38, 26,
        24, 21, 19, 17, 15, 13, 13, 13, 13, 9, 4, 0, 1, 2, 3, 3, 3, 3, 3, 3, 3,
        4, 5, 6, 10, 15, 19, 29, 38, 48, 54, 59, 65, 61, 56, 52, 54, 56, 58, 57,
        56, 55, 53, 50, 48, 49, 51, 52, 56, 61, 65, 57, 50, 42, 34, 27, 19, 17,
        15, 13, 12, 11, 10, 9, 7, 6, 5, 4, 3, 4, 5, 6, 6, 6, 6, 4, 2, 0, 0,
      ],
      weathercode: [
        3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
        3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 3, 3, 3, 3, 2, 1, 1, 1, 2, 3, 3,
        3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 51, 3, 3, 3, 3, 3,
        51, 51, 3, 51, 51, 53, 51, 51, 51, 3, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3,
        3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3,
        3, 3, 3, 61, 61, 61, 61, 61, 61, 61, 61, 61, 55, 55, 55, 61, 61, 61, 3,
        3, 3, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 2, 2, 2, 3, 3, 3, 3,
        3, 3, 3, 3, 3, 3, 3, 3, 3,
      ],
    },
    daily: {
      time: [
        "2023-10-08",
        "2023-10-09",
        "2023-10-10",
        "2023-10-11",
        "2023-10-12",
        "2023-10-13",
        "2023-10-14",
      ],
      weathercode: [3, 3, 51, 53, 61, 61, 3],
      temperature_2m_max: [23.6, 21.7, 21.6, 17.9, 13.4, 14.1, 12.8],
      temperature_2m_min: [14.1, 16.3, 16.7, 10.0, 4.5, 8.6, 7.3],
    },
  };
}

export const getWeather = USE_MOCK ? getWeatherMock : _getWeather;

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
