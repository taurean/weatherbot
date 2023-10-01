import { WiCloudyGusts } from "react-icons/wi";
import { WiCloudyWindy } from "react-icons/wi";
import { WiCloudy } from "react-icons/wi";
import { WiDayCloudyGusts } from "react-icons/wi";
import { WiDayCloudyHigh } from "react-icons/wi";
import { WiDayCloudyWindy } from "react-icons/wi";
import { WiDayFog } from "react-icons/wi";
import { WiDayHail } from "react-icons/wi";
import { WiDayHaze } from "react-icons/wi";
import { WiDayLightWind } from "react-icons/wi";
import { WiDayLightning } from "react-icons/wi";
import { WiDayRainMix } from "react-icons/wi";
import { WiDayRainWind } from "react-icons/wi";
import { WiDayRain } from "react-icons/wi";
import { WiDayShowers } from "react-icons/wi";
import { WiDaySleetStorm } from "react-icons/wi";
import { WiDaySleet } from "react-icons/wi";
import { WiDaySnowThunderstorm } from "react-icons/wi";
import { WiDaySnowWind } from "react-icons/wi";
import { WiDaySnow } from "react-icons/wi";
import { WiDaySprinkle } from "react-icons/wi";
import { WiDayStormShowers } from "react-icons/wi";
import { WiDaySunnyOvercast } from "react-icons/wi";
import { WiDaySunny } from "react-icons/wi";
import { WiDayThunderstorm } from "react-icons/wi";
import { WiDayWindy } from "react-icons/wi";

interface WeatherCardProps {
  locationName: string;
  tempCurrentCelsius: number;
  tempHighCelsius: number;
  tempLowCelsius: number;
  condition: string;
}

export function WeatherCard(prop: WeatherCardProps) {
  return (
    <>
      <div>
        <h2>{prop.locationName}</h2>
        <div>{prop.tempCurrentCelsius}</div>
        <div>
          {prop.tempHighCelsius} {prop.tempLowCelsius}
        </div>
        <div>
          <WiCloudyGusts />
        </div>
      </div>
    </>
  );
}
