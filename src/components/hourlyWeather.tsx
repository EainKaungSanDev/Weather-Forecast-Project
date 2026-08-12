import type { Weather } from "../types/weatherInterface";

import {WeatherIcons} from "./weatherIcons"

interface Props {
    weather: Weather | null;
    unit: "metric" | "us";
}

export const HourlyWeather = ({ weather, unit }: Props) => {

    if (!weather) return null;

    const hours = weather.days[0]?.hours ?? [];

    return (
        <div className="hourly-div">

            {hours.map((hour, index) => (

                <div className="hourly" key={index}>

             <h2>Hourly Forecast</h2>

                   <p className="icon">{WeatherIcons[hour.icon]}</p>

                    <p>
                        Time: {
                            new Date(
                                `1970-01-01T${hour.datetime}`
                            ).toLocaleTimeString("en-US", {
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                                hour12: true
                            })
                        }
                    </p>

                    <p>
                        Temperature: {hour.temp}°
                        {unit === "metric" ? "C" : "F"}
                    </p>

                    <p>
                        Feels Like: {hour.feelslike}°
                        {unit === "metric" ? "C" : "F"}
                    </p>

                    <p>
                        Condition: {hour.conditions}
                    </p>

                    <p>
                        Humidity: {hour.humidity}%
                    </p>

                    <p>
                        Wind: {hour.windspeed}
                        {unit === "metric" ? " km/h" : " mph"}
                    </p>

                    <p>
                        Wind Direction: {hour.winddir}°
                    </p>

                    <p>
                        Pressure: {hour.pressure} mb
                    </p>

                    <p>
                        Visibility: {hour.visibility}
                        {unit === "metric" ? " km" : " mi"}
                    </p>

                    <p>
                        Precipitation: {hour.precip}
                        {unit === "metric" ? " mm" : " in"}
                    </p>

                    <p>
                        Precipitation Probability: {hour.precipprob}%
                    </p>

                    <p>
                        Snow: {hour.snow}
                        {unit === "metric" ? " cm" : " in"}
                    </p>

                    <p>
                        Cloud Cover: {hour.cloudcover}%
                    </p>

                    <p>
                        UV Index: {hour.uvindex}
                    </p>

                </div>

            ))}

        </div>
    );
};
