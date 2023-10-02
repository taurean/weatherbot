const GEO_API_URL = `https://geocoding-api.open-meteo.com/v1/search?`;
// const WEATHER_API_URL = `https://api.open-meteo.com/v1/forecast?`;

interface LocationResponceItem {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1: string;
}

interface LocationReponse {
  results: LocationResponceItem[];
}

interface ErrorResponse {
  error: boolean;
  reason: string;
}

export async function getLocation(
  searchParam: string
): Promise<LocationReponse | ErrorResponse> {
  try {
    const response = await fetch(
      `${GEO_API_URL}name=${searchParam}&count10&language=en&format=json`
    );
    if (response.ok) {
      const results = await response.json();
      return { results };
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

// function weatherCodeToString(code: number) {
//   switch (code) {
//     case 0:
//       return "clear sky";
//     case 1:
//       return "mainly clear";
//     case 2:
//       return "partly cloudy";
//     case 3:
//       return "overcast";
//     case 45:
//     case 48:
//       return "fog";
//     case 51:
//       return "light drizzle";
//     case 53:
//     case 55:
//       return "moderate drizzle";
//     case 56:
//     case 57:
//       return "freezing drizzle";
//     case 61:
//       return "slight rain";
//     case 63:
//       return "rain";
//     case 65:
//       return "heavy rain";
//     case 66:
//     case 67:
//       return "freezing rain";
//     case 71:
//       return "light snow";
//     case 73:
//       return "snow";
//     case 75:
//     case 77:
//       return "heavy snow";
//     case 80:
//       return "slight rain showers";
//     case 81:
//       return "rain showers";
//     case 82:
//       return "violent rain showers";
//     case 85:
//       return "snow showers";
//     case 86:
//       return "heavy snow showers";
//     case 95:
//       return "thunderstorm";
//     case 96:
//       return "thunderstorm with light hail";
//     case 99:
//       return "thunderstorm with heavy hail";
//     default:
//       return "unknown";
//   }
// }

//api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,precipitation_probability,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=GMT

// function getWeatherApiUrl(lat: number, long: number, timezone: string) {
//   return `${WEATHER_API_URL}latitude=${lat}&longitutde=${long}&hourly=temperature_2m,precipitation_probability,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=${timezone}`;
// }
