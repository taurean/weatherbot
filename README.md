# Weatherbot

## Things to look for

- theming is managed with CSS Variables using the [Harmony Color Palette](https://twitter.com/romanshamin_en/status/1707756732674416806)
  - This allows for using colors in the p3 colorspace and more importantly always offers accessible color contrast meeting the criteria of WCAG 3 requirements
- each card is themed to match their weather condition. Clear skies are light blue, cloudy days are a darker blue shade, rainy days are purple, thunderstorms are fuschia, and snowy days are gray with a touch of blue mixed in.
  - for each card style, there is a light and dark variant depending on if the device is in a dark or light theme itself
- this project also uses CSS variables following the guidelines of [Utopia](http://utopia.fyi) to manage things like font-sizes, spacing, and CSS grid
  - This allows us to offer size values that make sense for different viewports without having to heavily rely on media-queries causing things to seemingly pop in an out
- everything meets the success criteria (2.1.1) for navigating with a keyboard
  - All interactive elements are accessible via tabbing
  - toggling between celsius and fahrenheit can be controlled with arrow keys when focused
- in the hourly forecast, hovering on the condition icons displays a tooltip of the condition description
- The location and weather API data comes from [Open Meteo](https://open-meteo.com)
  - the mock data can be toggled when running locally by changing the `USE_MOCK` variable to `true` in the file [`src/services/WeatherService.tsx`](https://github.com/taurean/weatherbot/blob/main/src/services/WeatherService.tsx)
- the icons come from [react-icons](https://react-icons.github.io/react-icons/), specifically the [weather icons](https://react-icons.github.io/react-icons/icons?name=wi) and [remix](https://react-icons.github.io/react-icons/icons?name=ri) packs
- there's a small example of utilizing storybook with mocked location data, to access run storybook locally. You can also access via the [published version online](http://weather-sb.taurean.work/)
- used [ARIAKit](http://ariakit.org), a library of utility components focused on accessibility and leveraging ARIA where needed. This ensures proper-semantics in the markup while not being dogmatic about how that UI is presented (see `FToggle` component)

## Commands

- run `npm i` to install necessary packages
- run `npm run dev` to run the app locally
- run `npm run storybook` to view component documentation
- run `npm run test` to run tests

## Things I would change if this were a real product

- Firefox currently doesn't support `:has()` in CSS, I would use a different approach for styling the celsius/fahrenheit toggle
- I would add loading states to cards to reduce the lag from when cards are added
- I would add error states when data is unavailable as well as when a location is improperly entered for adding a new location
- I would add an auto-fill+dropdown to the input field for adding new locations

## Requirements

- interface is list of weather cards
- card shows location, temp, high, low, and condition
- view as either Fº or Cº
- user can create new cards as needed
- user can remove cards
- user can expand card
- expanded card displays hourly forecast
- card remains after closing & reopening page
- service calls are made (mocked)
- there are tests

### Bonus

- handles network outages and service downtime gracefully
- user is able to reorder weather cards
- code & project is well-documented
- testing is thorough & extensive

### Extensions:

- alerts for changes from "not-rain" to "rain" and from "rain" to "not-rain"
  - closable, not stack, persist across page close & reopens, bonus for alerts to appear through browser notif API
- cloud sync
- real-time forecasts
