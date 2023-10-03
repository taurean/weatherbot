import { useEffect, useState } from "react";
import styles from "./FToggle.module.css";
import * as Ariakit from "@ariakit/react";

function useUnitPreference() {
  const [unitPreference, setUnitPreference] = useState(false);
  return [unitPreference, setUnitPreference];
}

export function FToggle() {
  const unitPreferenceBool = useUnitPreference();

  function setDefaultValue() {
    const localStorageResponse = localStorage.getItem("useFahrenheit");

    if (localStorageResponse == "true") {
      return "fahrenheit";
    } else {
      return "celsius";
    }
  }

  function handleOnChange() {
    unitPreferenceBool[0] = !unitPreferenceBool[0];
    localStorage.setItem(
      "useFahrenheit",
      unitPreferenceBool[0].toString() as string
    );
  }

  return (
    <>
      <Ariakit.RadioProvider defaultValue={setDefaultValue()}>
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
