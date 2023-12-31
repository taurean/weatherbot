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

// lines ~26-35 are used for using localStorage to initialize the app state
const localStorageResponse = localStorage.getItem("useFahrenheit");
let initialUnitPreference = localStorageResponse as UnitPreference;

const initialLocationList: CardLocation[] = JSON.parse(
  localStorage.getItem("locationArray") || "[]"
);

if (localStorageResponse === null) {
  initialUnitPreference = "celsius";
}

function App() {
  // Most of the app state is managed here
  // the weather data is managed in `weatherCard`
  // as that is refreshed when state changes / not stored
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
        <span>
          <h1 className="rootHeadingTitle">Weatherbot</h1>
          <a
            className="rootLink"
            href="https://github.com/taurean/weatherbot/blob/main/README.md"
            target="_blank"
          >
            readme.md
          </a>
        </span>
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
        <footer className="rootFooter">
          <p>
            Feel free to view the{" "}
            <a
              className="rootLink"
              href="http://github.com/taurean/weatherbot"
              target="_blank"
            >
              source code
            </a>{" "}
            or{" "}
            <a
              className="rootLink"
              href="http://weather-sb.taurean.work/"
              target="_blank"
            >
              Storybook docs
            </a>{" "}
            as well.{" "}
          </p>
          <p>
            built by{" "}
            <a className="rootLink" href="https://taurean.work" target="_blank">
              Taurean Bryant
            </a>
            .
          </p>
        </footer>
      </main>
    </>
  );
}

export default App;
