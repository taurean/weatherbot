import { useWeather } from "../../services/WeatherService";
import { CardLocation } from "../../App";
import { RiTimeFill } from "react-icons/ri";
import { RiDeleteBinFill } from "react-icons/ri";
import { RiArrowRightLine } from "react-icons/ri";
import { RiArrowLeftLine } from "react-icons/ri";
import styles from "./WeatherCard.module.css";
import { WiDaySunny } from "react-icons/wi";
import { WiDayCloudy } from "react-icons/wi";
import { WiDaySunnyOvercast } from "react-icons/wi";
import { WiFog } from "react-icons/wi";
import { WiSprinkle } from "react-icons/wi";
import { WiRainMix } from "react-icons/wi";
import { WiRain } from "react-icons/wi";
import { WiSnow } from "react-icons/wi";
import { WiSnowWind } from "react-icons/wi";
import { WiShowers } from "react-icons/wi";
import { WiSleet } from "react-icons/wi";
import { WiThunderstorm } from "react-icons/wi";
import { WiHail } from "react-icons/wi";
import { cToF } from "../../utils";

type BaseCardProps = {
  locationId: number;
  locationRegion1?: string;
  locationRegion2?: string;
  country?: string;
  timezone?: string;
  locationName: string;
  tempCurrentCelsius: number;
  condition: number;
  setIsExpanded: (id: number, isExpanded: boolean) => void;
  prefersFahrenheit?: boolean;
};

type CollapsedProps = BaseCardProps & {
  tempHighCelsius: number;
  tempLowCelsius: number;
};

type ExpandedProps = BaseCardProps & {
  removeCard: (id: number) => void;
  hourly: {
    temperature_2m: number[];
    time: string[];
    weathercode: number[];
  };
};

type WeatherCardProps = {
  location: CardLocation;
  prefersFahrenheit?: boolean;
  setIsExpanded: (id: number, isExpanded: boolean) => void;
  removeCard: (id: number) => void;
};

function weatherCodeFormatter(code: number) {
  switch (code) {
    case 0:
      return {
        classNameValue: `${styles.cardClearSky}`,
        icon: <WiDaySunny />,
        description: `clear sky`,
      };
    case 1:
      return {
        classNameValue: `${styles.cardClearSky}`,
        icon: <WiDaySunny />,
        description: `mainly clear`,
      };
    case 2:
      return {
        classNameValue: `${styles.cardCloudy}`,
        icon: <WiDayCloudy />,
        description: `partly cloudy`,
      };
    case 3:
      return {
        classNameValue: `${styles.cardCloudy}`,
        icon: <WiDaySunnyOvercast />,
        description: `overcast`,
      };
    case 45:
    case 48:
      return {
        classNameValue: `${styles.cardCloudy}`,
        icon: <WiFog />,
        description: `fog`,
      };
    case 51:
      return {
        classNameValue: `${styles.cardRain}`,
        icon: <WiSprinkle />,
        description: `light drizzle`,
      };
    case 53:
    case 55:
      return {
        classNameValue: `${styles.cardRain}`,
        icon: <WiSprinkle />,
        description: `moderate drizzle`,
      };
    case 56:
    case 57:
      return {
        classNameValue: `${styles.cardRain}`,
        icon: <WiSprinkle />,
        description: `freezing drizzle`,
      };
    case 61:
      return {
        classNameValue: `${styles.cardRain}`,
        icon: <WiRainMix />,
        description: `slight rain`,
      };
    case 63:
      return {
        classNameValue: `${styles.cardRain}`,
        icon: <WiRain />,
        description: `rain`,
      };
    case 65:
      return {
        classNameValue: `${styles.cardRain}`,
        icon: <WiRain />,
        description: `heavy rain`,
      };
    case 66:
    case 67:
      return {
        classNameValue: `${styles.cardRain}`,
        icon: <WiRain />,
        description: `freezing rain`,
      };
    case 71:
      return {
        classNameValue: `${styles.cardSnow}`,
        icon: <WiSnow />,
        description: `light snow`,
      };
    case 73:
      return {
        classNameValue: `${styles.cardSnow}`,
        icon: <WiSnow />,
        description: `snow`,
      };
    case 75:
    case 77:
      return {
        classNameValue: `${styles.cardSnow}`,
        icon: <WiSnowWind />,
        description: `heavy snow`,
      };
    case 80:
      return {
        classNameValue: `${styles.cardRain}`,
        icon: <WiShowers />,
        description: `slight rain showers`,
      };
    case 81:
      return {
        classNameValue: `${styles.cardRain}`,
        icon: <WiShowers />,
        description: `rain showers`,
      };
    case 82:
      return {
        classNameValue: `${styles.cardRain}`,
        icon: <WiRainMix />,
        description: `violent rain showers`,
      };
    case 85:
      return {
        classNameValue: `${styles.cardSnow}`,
        icon: <WiRainMix />,
        description: `snow showers`,
      };
    case 86:
      return {
        classNameValue: `${styles.cardSnow}`,
        icon: <WiSleet />,
        description: `heavy snow showers`,
      };
    case 95:
      return {
        classNameValue: `${styles.cardThunderstorm}`,
        icon: <WiThunderstorm />,
        description: `thunderstorm`,
      };
    case 96:
      return {
        classNameValue: `${styles.cardThunderstorm}`,
        icon: <WiHail />,
        description: `thunderstorm with light hail`,
      };
    case 99:
      return {
        classNameValue: `${styles.cardThunderstorm}`,
        icon: <WiHail />,
        description: `thunderstorm with heavy hail`,
      };
    default:
      return {
        classNameValue: ``,
        icon: ``,
        description: ``,
      };
  }
}

function CollapsedCard(prop: CollapsedProps) {
  let tempCurrent = prop.tempCurrentCelsius;
  let tempHigh = prop.tempHighCelsius;
  let tempLow = prop.tempLowCelsius;
  const conditionDescription = weatherCodeFormatter(prop.condition).description;
  const conditionClassName =
    weatherCodeFormatter(prop.condition).classNameValue || "";
  const conditionIconName = weatherCodeFormatter(prop.condition).icon;

  if (prop.prefersFahrenheit == true) {
    tempCurrent = cToF(tempCurrent);
    tempHigh = cToF(tempHigh);
    tempLow = cToF(tempLow);
  }

  function handleOnClick() {
    prop.setIsExpanded(prop.locationId, true);
  }

  return (
    <>
      <div className={`${styles.card} ${conditionClassName}`}>
        <h2 className={styles.cardTitle}>{prop.locationName}</h2>
        <div className={styles.cardLocation}>
          {prop.locationRegion1 == undefined
            ? prop.locationRegion1
            : prop.locationRegion1 + `, `}
          {prop.country}
        </div>
        <div className={styles.cardIconWrapper}>
          <div className={styles.icon}>{conditionIconName}</div>
        </div>
        <div className={styles.cardTempCurrent}>{tempCurrent}</div>
        <div className={styles.cardCondition}>{conditionDescription} </div>
        <footer className={styles.cardFoot}>
          <div className={styles.cardHighLow}>
            <div className={styles.cardHigh}>
              <div className={styles.cardHighValue}>{tempHigh}</div>
              <div className={styles.cardHighlabel}>high</div>
            </div>
            <div className={styles.cardLow}>
              <div className={styles.cardLowValue}>{tempLow}</div>
              <div className={styles.cardLowlabel}>low</div>
            </div>
          </div>
          <button onClick={handleOnClick} className={styles.cardExpandToggle}>
            <RiTimeFill />
            hourly forecast
            <RiArrowRightLine className={styles.cardExpandToggleRightArrow} />
          </button>
        </footer>
      </div>
    </>
  );
}

function ExpandedCard(prop: ExpandedProps) {
  const conditionClassName =
    weatherCodeFormatter(prop.condition).classNameValue || "";
  const conditionIconName = weatherCodeFormatter(prop.condition).icon;
  let tempCurrent = prop.tempCurrentCelsius;
  const conditionDescription = weatherCodeFormatter(prop.condition).description;

  if (prop.prefersFahrenheit == true) {
    tempCurrent = cToF(tempCurrent);
  }

  function handleClickCollapse() {
    prop.setIsExpanded(prop.locationId, false);
  }

  function handleClickRemove() {
    prop.removeCard(prop.locationId);
  }

  return (
    <>
      <div
        className={`${styles.card} ${styles.cardIsExpanded} ${conditionClassName}`}
      >
        <h2 className={styles.cardTitle}>{prop.locationName}</h2>
        <div className={styles.cardLocation}>
          {prop.locationRegion1 == undefined
            ? prop.locationRegion1
            : prop.locationRegion1 + `, `}
          {prop.country}
        </div>
        <div className={styles.cardIconWrapper}>
          <div className={styles.icon}>{conditionIconName}</div>
        </div>
        <div className={styles.cardTempCurrent}>{tempCurrent}</div>
        <div className={styles.cardCondition}>{conditionDescription}</div>
        <footer className={styles.cardFoot}>
          <ol className={styles.hourlyForecast}>
            {prop.hourly.time.slice(0, 24).map((time, i) => {
              return (
                <li key={i} className={styles.hourlyForecastItem}>
                  <div className={styles.hourlyForecastTime}>
                    {new Intl.DateTimeFormat("en-US", {
                      hour: "numeric",
                    }).format(new Date(time))}
                  </div>
                  <div
                    title={
                      weatherCodeFormatter(prop.hourly.weathercode[i])
                        .description
                    }
                    className={styles.hourlyForecastIcon}
                  >
                    {weatherCodeFormatter(prop.hourly.weathercode[i]).icon}
                  </div>
                  <div className={styles.hourlyForecastTemp}>
                    {prop.prefersFahrenheit
                      ? cToF(prop.hourly.temperature_2m[i])
                      : prop.hourly.temperature_2m[i]}
                  </div>
                </li>
              );
            })}
          </ol>
          <div className={styles.cardBtnGroup}>
            <button
              onClick={handleClickCollapse}
              className={styles.cardExpandToggle}
            >
              <RiArrowLeftLine />
              collapse
            </button>
            <button
              onClick={handleClickRemove}
              className={styles.removeCardBtn}
            >
              <RiDeleteBinFill />
              <span visually-hidden="true">Remove Location</span>
            </button>
          </div>
        </footer>
      </div>
    </>
  );
}

export function WeatherCard(prop: WeatherCardProps) {
  const weatherData = useWeather(prop.location);

  function formatRegion(locationName: string, region: string) {
    return locationName == region ? undefined : region;
  }

  const region = formatRegion(
    prop.location.locationName,
    prop.location.locationRegion1
  );

  if (!weatherData) {
    return null;
  }

  return (
    <>
      {!prop.location.isExpanded ? (
        <CollapsedCard
          locationId={prop.location.id}
          locationName={prop.location.locationName}
          locationRegion1={region}
          country={prop.location.country}
          tempCurrentCelsius={weatherData.hourly.temperature_2m[0]}
          tempHighCelsius={weatherData.daily.temperature_2m_max[0]}
          tempLowCelsius={weatherData.daily.temperature_2m_min[0]}
          condition={weatherData.hourly.weathercode[0]}
          {...prop}
        />
      ) : (
        <ExpandedCard
          locationId={prop.location.id}
          locationName={prop.location.locationName}
          locationRegion1={region}
          country={prop.location.country}
          tempCurrentCelsius={weatherData.hourly.temperature_2m[0]}
          condition={weatherData.hourly.weathercode[0]}
          hourly={weatherData.hourly}
          {...prop}
        />
      )}
    </>
  );
}
