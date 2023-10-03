import { useState } from "react";
import styles from "./FToggle.module.css";
import * as Ariakit from "@ariakit/react";

const localStorageResponse = localStorage.getItem("useFahrenheit");

type UnitPreference = "fahrenheit" | "celsius";

let initialUnitPreference = localStorageResponse as UnitPreference;

if (localStorageResponse == undefined) {
  initialUnitPreference = "celsius";
}

function useUnitPreference(): [
  UnitPreference,
  (unitPreference: UnitPreference) => void
] {
  const [unitPreference, setUnitPreference] = useState(initialUnitPreference);
  return [unitPreference, setUnitPreference];
}

export function FToggle() {
  const [unitPreference, setUnitPreference] = useUnitPreference();

  function handleOnChange() {
    const nextPreference =
      unitPreference == "celsius" ? "fahrenheit" : "celsius";
    setUnitPreference(nextPreference);
    localStorage.setItem("useFahrenheit", nextPreference);
  }

  return (
    <>
      <Ariakit.RadioProvider defaultValue={unitPreference}>
        <Ariakit.RadioGroup
          className={styles.radioGroup}
          onChange={handleOnChange}
        >
          <label className={styles.label}>
            <Ariakit.Radio
              className={styles.radio}
              value="celsius"
              visually-hidden="true"
            />
            Celsius
          </label>
          <label className={styles.label}>
            <Ariakit.Radio
              className={styles.radio}
              value="fahrenheit"
              visually-hidden="true"
            />
            fahrenheit
          </label>
        </Ariakit.RadioGroup>
      </Ariakit.RadioProvider>
    </>
  );
}
