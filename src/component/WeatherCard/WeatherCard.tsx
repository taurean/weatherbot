import { RiTimeFill } from "react-icons/ri";
import { RiArrowRightLine } from "react-icons/ri";
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

interface WeatherCardProps {
  locationName: string;
  tempCurrentCelsius: number;
  tempHighCelsius: number;
  tempLowCelsius: number;
  condition: number;
  prefersFehrenheit?: boolean;
}

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

function cToF(temp: number) {
  return Math.round(temp * (9 / 5) + 32);
}

export function WeatherCard(prop: WeatherCardProps) {
  let tempCurrent = prop.tempCurrentCelsius;
  let tempHigh = prop.tempHighCelsius;
  let tempLow = prop.tempLowCelsius;
  const conditionDescription = weatherCodeFormatter(prop.condition).description;
  const conditionClassName =
    weatherCodeFormatter(prop.condition).classNameValue || "";
  const conditionIconName = weatherCodeFormatter(prop.condition).icon;

  if (prop.prefersFehrenheit == true) {
    tempCurrent = cToF(tempCurrent);
    tempHigh = cToF(tempHigh);
    tempLow = cToF(tempLow);
  }

  return (
    <>
      <div className={`${styles.card} ${conditionClassName}`}>
        <h2 className={styles.cardTitle}>{prop.locationName}</h2>
        <div className={styles.cardIconWrapper}>
          <div className={styles.icon}>{conditionIconName}</div>
        </div>
        <div className={styles.cardTempCurrent}>{tempCurrent}</div>
        <div className={styles.cardCondition}>
          {conditionDescription}{" "}
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
