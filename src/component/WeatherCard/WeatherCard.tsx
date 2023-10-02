import { WiCloudyGusts } from "react-icons/wi";
import { RiTimeFill } from "react-icons/ri";
import { RiArrowRightLine } from "react-icons/ri";
import styles from "./WeatherCard.module.css";

interface WeatherCardProps {
  locationName: string;
  tempCurrentCelsius: number;
  tempHighCelsius: number;
  tempLowCelsius: number;
  condition: number;
  prefersFehrenheit?: boolean;
}

function weatherCodeToString(code: number) {
  switch (code) {
    case 0:
      return "clear sky";
    case 1:
      return "mainly clear";
    case 2:
      return "partly cloudy";
    case 3:
      return "overcast";
    case 45:
    case 48:
      return "fog";
    case 51:
      return "light drizzle";
    case 53:
    case 55:
      return "moderate drizzle";
    case 56:
    case 57:
      return "freezing drizzle";
    case 61:
      return "slight rain";
    case 63:
      return "rain";
    case 65:
      return "heavy rain";
    case 66:
    case 67:
      return "freezing rain";
    case 71:
      return "light snow";
    case 73:
      return "snow";
    case 75:
    case 77:
      return "heavy snow";
    case 80:
      return "slight rain showers";
    case 81:
      return "rain showers";
    case 82:
      return "violent rain showers";
    case 85:
      return "snow showers";
    case 86:
      return "heavy snow showers";
    case 95:
      return "thunderstorm";
    case 96:
      return "thunderstorm with light hail";
    case 99:
      return "thunderstorm with heavy hail";
    default:
      return "unknown";
  }
}

function weatherConditionStyle(code: number) {
  switch (code) {
    case 0:
    case 1:
      return `${styles.cardClearSky}`;
    case 2:
    case 3:
    case 45:
    case 48:
      return `${styles.cardCloudy}`;
    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
    case 80:
    case 81:
    case 82:
      return `${styles.cardRain}`;
    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86:
      return `${styles.cardSnow}`;
    case 95:
    case 96:
    case 99:
      return `${styles.cardThunderstorm}`;
    default:
      return "";
  }
}

function cToF(temp: number) {
  return Math.round(temp * (9 / 5) + 32);
}

export function WeatherCard(prop: WeatherCardProps) {
  let tempCurrent = prop.tempCurrentCelsius;
  let tempHigh = prop.tempHighCelsius;
  let tempLow = prop.tempLowCelsius;

  if (prop.prefersFehrenheit == true) {
    tempCurrent = cToF(tempCurrent);
    tempHigh = cToF(tempHigh);
    tempLow = cToF(tempLow);
  }

  return (
    <>
      <div
        className={`${styles.card} ${
          weatherConditionStyle(prop.condition) || ""
        }`}
      >
        <h2 className={styles.cardTitle}>{prop.locationName}</h2>
        <div className={styles.cardIconWrapper}>
          <div className={styles.icon}>
            <WiCloudyGusts />
          </div>
        </div>
        <div className={styles.cardTempCurrent}>{tempCurrent}</div>
        <div className={styles.cardCondition}>
          {weatherCodeToString(prop.condition)}{" "}
          <span visually-hidden="true">degrees fehrenheit</span>
        </div>
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
          <button className={styles.cardExpandToggle}>
            <RiTimeFill />
            hourly forecast
            <RiArrowRightLine className={styles.cardExpandToggleRightArrow} />
          </button>
        </footer>
      </div>
    </>
  );
}
