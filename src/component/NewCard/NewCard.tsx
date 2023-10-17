import { useState, FormEvent } from "react";
import styles from "./NewCard.module.css";

type NewCard = {
  setLocationObject: (locationName: string) => void;
};

const mockedLocationList = [
  {
    country: "US",
    name: "Bay Minette",
    lat: "30.88296",
    lng: "-87.77305",
  },
  {
    country: "US",
    name: "Edna",
    lat: "28.97859",
    lng: "-96.64609",
  },
  {
    country: "US",
    name: "Bayou La Batre",
    lat: "30.40352",
    lng: "-88.24852",
  },
  {
    country: "US",
    name: "Henderson",
    lat: "32.15322",
    lng: "-94.79938",
  },
  {
    country: "US",
    name: "Natalia",
    lat: "29.18968",
    lng: "-98.86253",
  },
];

export function NewCard(prop: NewCard) {
  const [inputValue, setInputValue] = useState("");
  const [locationValue, setLocationValue] = useState("");

  function handleOnChange(e: FormEvent<HTMLInputElement>) {
    setInputValue((e.target as HTMLInputElement).value);
  }

  function handleLocationUpdate(e: FormEvent<HTMLInputElement>) {
    setLocationValue((e.target as HTMLInputElement).value);
  }

  function handleOnSubmit(e: FormEvent) {
    e.preventDefault();
    // prop.setLocationObject(inputValue);
    const long = parseFloat(locationValue.split(",")[0]);
    const lat = parseFloat(locationValue.split(",")[1]);

    const nearestLocationIndex = mockedLocationList.reduce(
      (nearest, location) => {
        const mockedLong = parseFloat(location.lng);
        const mockedLat = parseFloat(location.lat);
        const distance = Math.sqrt(
          Math.pow(mockedLat - lat, 2) + Math.pow(mockedLong - long, 2)
        );
        if (distance < nearest.distance) {
          return { location, distance };
        } else {
          return nearest;
        }
      },
      { location: null, distance: Infinity }
    );

    console.log(nearestLocationIndex);

    setInputValue("");
  }

  return (
    <>
      <form className={styles.newCard} onSubmit={handleOnSubmit}>
        <label className={styles.newCardLabel} htmlFor="newCardInput">
          New Location
        </label>
        <input
          className={styles.newCardInput}
          value={inputValue}
          onChange={handleOnChange}
          id="newCardInput"
          type="text"
          placeholder="New York…"
        />
        <label htmlFor="longLat">Long & Lat</label>
        <input
          id="longLat"
          onChange={handleLocationUpdate}
          type="text"
          className={styles.newCardInput}
        />
        <button className={styles.newCardBtn}>Add Card</button>
      </form>
    </>
  );
}
