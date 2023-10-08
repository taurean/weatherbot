import { useState, useEffect, FormEvent } from "react";
import styles from "./NewCard.module.css";

type NewCard = {
  setLocationObject: (locationName: string) => void;
};

export function NewCard(prop: NewCard) {
  const [inputValue, setInputValue] = useState("");

  function handleOnChange(e: FormEvent<HTMLInputElement>) {
    setInputValue((e.target as HTMLInputElement).value);
  }

  function handleOnSubmit(e: FormEvent) {
    e.preventDefault();
    prop.setLocationObject(inputValue);
    setInputValue("");
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
            value={inputValue}
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
