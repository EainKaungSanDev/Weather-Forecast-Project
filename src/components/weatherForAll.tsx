import type { Weather } from "../types/weatherInterface";

import { CurrentWeather } from "./currentWeather";
import { HourlyWeather } from "./hourlyWeather";
import { ThreeDaysWeather } from "./threeDaysWeather";

interface Props {
    weather: Weather | null;
    unit : "metric" | "us"
}

export const WeatherForAll = ({ weather,unit }: Props) => {
    return (
        <>
            <CurrentWeather weather={weather}
unit={unit} />

            <HourlyWeather weather={weather}
unit={unit} />

            <ThreeDaysWeather weather={weather}
unit={unit} />
        </>
    );
};
