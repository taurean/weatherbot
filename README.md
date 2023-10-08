# Weatherbot

## Quickstart

- run `npm i` to install necessary packages
- run `npm run dev` to run the app locally
- run `npm run storybook` to view component documentation
- run `npm run test` to run tests
- to tets mock data, update `USE_MOCK` to `true` to use mock data instead of API results

## Things I would change if this were a real product

- Firefox currently doesn't support `:has()` in CSS, I would use a different approach for styling the celsius/fahrenheit toggle

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
