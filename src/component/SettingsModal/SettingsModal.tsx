import { useState, useEffect } from "react";
import * as Ariakit from "@ariakit/react";
import "./SettingsModal.css";

export function SettingsModal() {
  const dialog = Ariakit.useDialogStore({ animated: true });

  const [isFahrenheit, setIsFahrenheit] = useState(
    JSON.parse(localStorage.getItem("isFahrenheit") ?? "true")
  );

  // Update localStorage whenever the state changes
  useEffect(() => {
    localStorage.setItem("isFahrenheit", JSON.stringify(isFahrenheit));
  }, [isFahrenheit]);

  return (
    <>
      <Ariakit.Button onClick={dialog.show} className="button">
        Settings
      </Ariakit.Button>
      <Ariakit.Dialog
        store={dialog}
        backdrop={<div className="backdrop" />}
        className="dialog"
      >
        <Ariakit.DialogHeading className="heading">
          Settings
        </Ariakit.DialogHeading>
        <div>
          <label>
            Temperature in Fahrenheit
            <input
              type="checkbox"
              checked={isFahrenheit}
              onChange={(e) => setIsFahrenheit(e.target.checked)}
              aria-label="Temperature preference"
              className="inputCheckbox"
            />
          </label>
        </div>
        <div>
          <Ariakit.DialogDismiss className="button">OK</Ariakit.DialogDismiss>
        </div>
      </Ariakit.Dialog>
    </>
  );
}
