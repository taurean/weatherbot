import styles from "./FToggle.module.css";
import * as Ariakit from "@ariakit/react";
import { UnitPreference } from "../../App";

type FToggleProps = {
  currentValue: UnitPreference;
  setPreferredValue: (preferredValue: UnitPreference) => void;
};

export function FToggle(prop: FToggleProps) {
  function handleOnChange() {
    const nextPreference =
      prop.currentValue == "celsius" ? "fahrenheit" : "celsius";
    prop.setPreferredValue(nextPreference);
  }

  return (
    <>
      <Ariakit.RadioProvider defaultValue={prop.currentValue}>
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
