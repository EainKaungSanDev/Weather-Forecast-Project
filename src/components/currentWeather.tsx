import type { Weather } from "../types/weatherInterface";

import {WeatherIcons} from "./weatherIcons"

interface Props {
    weather: Weather | null;
    unit: "metric" | "us";
}

export const CurrentWeather = ({ weather, unit }: Props) => {

    if (!weather) return null;

    const current = weather.currentConditions;

    return (
        <div className="current-div">
        <div className="current">

            <h2>Current Weather</h2>
            
            <p className="icon">{WeatherIcons[current.icon]}</p>

            <p>
                Temperature: {current.temp}°
                {unit === "metric" ? "C" : "F"}
            </p>

            <p>
                Feels Like: {current.feelslike}°
                {unit === "metric" ? "C" : "F"}
            </p>

            <p>
                Condition: {current.conditions}
            </p>

            <p>
                Humidity: {current.humidity}%
            </p>

            <p>
                Wind: {current.windspeed}{" "}
                {unit === "metric" ? "km/h" : "mph"}
            </p>

            <p>
                Wind Direction: {current.winddir}°
            </p>

            <p>
                Pressure: {current.pressure} mb
            </p>

            <p>
                Visibility: {current.visibility}{" "}
                {unit === "metric" ? "km" : "mi"}
            </p>

            <p>
                Precipitation: {current.precip}{" "}
                {unit === "metric" ? "mm" : "in"}
            </p>

            <p>
                Snow: {current.snow}{" "}
                {unit === "metric" ? "cm" : "in"}
            </p>

            <p>
                Cloud Cover: {current.cloudcover}%
            </p>

            <p>
                UV Index: {current.uvindex}
            </p>

        </div>
     </div>
    );
};
