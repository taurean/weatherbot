import styles from "./Button.module.css";
import { Button as AriaKitButton } from "@ariakit/react";

export default function Button() {
  return <AriaKitButton className={styles.button}>Button</AriaKitButton>;
}
