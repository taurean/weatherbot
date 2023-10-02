import "./LocationSearch.css";
import * as Ariakit from "@ariakit/react";
import { getLocation } from "../services/WeatherService";

export function LocationSearch() {
  const combobox = Ariakit.useComboboxStore();
  const select = Ariakit.useSelectStore({ combobox });
  const selectValue = select.useState("value");

  return (
    <div className="wrapper">
      <Ariakit.ComboboxProvider>
        <label className="label">
          Location
          <Ariakit.Combobox placeholder="e.g., Vallejo" className="combobox" />
        </label>

        <Ariakit.ComboboxPopover gutter={4} sameWidth className="popover">
          <Ariakit.ComboboxItem className="combobox-item" value="Apple">
            🍎 Apple
          </Ariakit.ComboboxItem>
          <Ariakit.ComboboxItem className="combobox-item" value="Grape">
            🍇 Grape
          </Ariakit.ComboboxItem>
          <Ariakit.ComboboxItem className="combobox-item" value="Orange">
            🍊 Orange
          </Ariakit.ComboboxItem>
          <Ariakit.ComboboxItem className="combobox-item" value="Strawberry">
            🍓 Strawberry
          </Ariakit.ComboboxItem>
          <Ariakit.ComboboxItem className="combobox-item" value="Watermelon">
            🍉 Watermelon
          </Ariakit.ComboboxItem>
        </Ariakit.ComboboxPopover>
      </Ariakit.ComboboxProvider>
    </div>
  );
}
