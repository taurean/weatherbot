import styles from "./NewCard.module.css";

export function NewCard() {
  return (
    <>
      <div className={styles.newCard}>
        <label htmlFor="newCardInput">New Location</label>
        <input id="newCardInput" type="text" placeholder="New York…" />
        <button>Add Card</button>
      </div>
    </>
  );
}
