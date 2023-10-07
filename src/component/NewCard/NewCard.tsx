import { useState, useEffect } from "react";
import styles from "./NewCard.module.css";

type NewCard = {
  setLocationObject: (locationName: string) => void;
};

export function NewCard(prop: NewCard) {
  const [inputValue, setInputValue] = useState("");

  function handleOnChange() {
    setInputValue(event?.target.value);
  }

  function handleOnSubmit() {
    event?.preventDefault();
    prop.setLocationObject(inputValue);
  }

  return (
    <>
      <div className={styles.newCard}>
        <form onSubmit={handleOnSubmit}>
          <label className={styles.newCardLabel} htmlFor="newCardInput">
            New Location
          </label>
          <input
            className={styles.newCardInput}
            onChange={handleOnChange}
            id="newCardInput"
            type="text"
            placeholder="New York…"
          />
          <button className={styles.newCardBtn}>Add Card</button>
        </form>
      </div>
    </>
  );
}
