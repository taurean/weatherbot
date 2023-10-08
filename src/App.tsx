import { useState } from "react";
import "./App.css";

import { FToggle } from "./component/FToggle/FToggle";
import { WeatherCard } from "./component/WeatherCard/WeatherCard";
import { NewCard } from "./component/NewCard/NewCard";

import { getLocation } from "./services/WeatherService";

export type UnitPreference = "fahrenheit" | "celsius";

export type CardLocation = {
  id: number;
  locationName: string;
  locationRegion1: string;
  locationRegion2: string;
  country: string;
  longitude: number;
  latitude: number;
  timezone: string;
  isExpanded: boolean;
};

const localStorageResponse = localStorage.getItem("useFahrenheit");
let initialUnitPreference = localStorageResponse as UnitPreference;

const initialLocationList: CardLocation[] = JSON.parse(
  localStorage.getItem("locationArray") || "[]"
);

if (localStorageResponse === null) {
  initialUnitPreference = "celsius";
}

function App() {
  const [locationList, setLocationList] =
    useState<CardLocation[]>(initialLocationList);
  const [unitPreference, setUnitPreference] = useState(initialUnitPreference);

  function setIsExpanded(id: number, isExpanded: boolean) {
    const nextLocationList = [...locationList];
    const cardIndex = nextLocationList.findIndex((location) => {
      return location.id == id;
    });
    const updatedCard = { ...locationList[cardIndex] };
    updatedCard.isExpanded = isExpanded;

    nextLocationList[cardIndex] = updatedCard;
    setLocationList(nextLocationList);
    localStorage.setItem("locationArray", JSON.stringify(nextLocationList));
  }

  function removeCard(id: number) {
    const nextLocationList = [...locationList];
    const cardIndex = nextLocationList.findIndex((location) => {
      return location.id == id;
    });
    nextLocationList.splice(cardIndex, 1);
    setLocationList(nextLocationList);
    localStorage.setItem("locationArray", JSON.stringify(nextLocationList));
  }

  async function handleAddLocation(enteredLocation: string) {
    const currentLocationId = Math.floor(Math.random() * 9000000000);
    const locationData = await getLocation(enteredLocation);

    if (!("error" in locationData)) {
      const firstLocationResult = locationData[0];

      const currentLocation: CardLocation = {
        id: currentLocationId,
        locationName: firstLocationResult.name,
        locationRegion1: firstLocationResult.admin1,
        locationRegion2: firstLocationResult.admin2,
        country: firstLocationResult.country,
        longitude: firstLocationResult.longitude,
        latitude: firstLocationResult.latitude,
        timezone: firstLocationResult.timezone,
        isExpanded: false,
      };

      const nextLocationList = [...locationList, currentLocation];

      setLocationList(nextLocationList);
      localStorage.setItem("locationArray", JSON.stringify(nextLocationList));
    }
  }

  function togglePreference(nextPreference: UnitPreference) {
    setUnitPreference(nextPreference);
    localStorage.setItem("useFahrenheit", nextPreference);
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
        <section className="u-grid">
          {locationList.map((location) => {
            return (
              <WeatherCard
                key={location.id}
                location={location}
                prefersFahrenheit={unitPreference == "fahrenheit"}
                setIsExpanded={setIsExpanded}
                removeCard={removeCard}
              />
            );
          })}
          <NewCard setLocationObject={handleAddLocation} />
        </section>
      </main>
    </>
  );
}

export default App;
