# Weatherbot

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

# APIs

## coords

`GET /api/coordinates/${location}`

```json
200 {
  data: {
    lat: number,
    lng: number
  }
}

404 {
  error: string
}

500 {
  error: string
}
```

## forecast

`GET /api/forecast/${lat}/${lng}`

```json
TemperatureForecast: {
	degrees: number,
	time: string,
}

WeatherForecast: {
	temp: {
		hourly: TemperatureForecast[],
		high: number,
		low: number,
}

weather: 'cloudy' | 'rain' | 'sunny'
}

200 {
  data: {
    forecast: WeatherForecast
  }
}

500 {
  error: string
}
```

---

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
