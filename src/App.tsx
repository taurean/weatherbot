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

export type UnitPreference = "fahrenheit" | "celsius";

const localStorageResponse = localStorage.getItem("useFahrenheit");
let initialUnitPreference = localStorageResponse as UnitPreference;

if (localStorageResponse === null) {
  initialUnitPreference = "celsius";
}

console.log(initialUnitPreference, localStorageResponse);

function evenItems<T>(arr: T[]) {
  return arr;
}

const arrExample: object[] = [{}];
const evenExample = evenItems(arrExample);
console.log(evenExample);

function App() {
  const [location, setLocationName] = useState<LocationReponse | null>(null);
  const [locationList, setLocationList] = useState<LocationReponse[]>([]);

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

  const [isExpanded, setIsExpanded] = useState(false);

  const [unitPreference, setUnitPreference] = useState(initialUnitPreference);

  function togglePreference(nextPreference: UnitPreference) {
    setUnitPreference(nextPreference);
    localStorage.setItem("useFahrenheit", nextPreference);
    console.log(`preference toggled`);
  }
  // End of Unit Preference

  async function handleAddCard() {
    const location = await getLocation("New York");
    if (!("error" in location)) {
      setLocationList([...locationList, location]);
    }
  }

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
        <button onClick={handleAddCard}>Add Card</button>
        <section className="u-grid">
          {location && (
            <WeatherCard
              location={location}
              prefersFahrenheit={unitPreference == "fahrenheit"}
              isExpanded={isExpanded}
              setIsExpanded={setIsExpanded}
            />
          )}
          {locationList.map((location) => {
            return (
              <WeatherCard
                location={location}
                prefersFahrenheit={unitPreference == "fahrenheit"}
                isExpanded={isExpanded}
                setIsExpanded={setIsExpanded}
              />
            );
          })}
        </section>
      </main>
    </>
  );
}

export default App;
