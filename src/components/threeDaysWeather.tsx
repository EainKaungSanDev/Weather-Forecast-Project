import type { Weather } from "../types/weatherInterface";

import {WeatherIcons} from "./weatherIcons"

interface Props {
    weather: Weather | null;
    unit: "metric" | "us";
}

export const ThreeDaysWeather = ({ weather, unit }: Props) => {

    if (!weather) return null;

    const days = weather.days.slice(0, 3);

    return (
        <div className="threeDays-div">

            {days.map((day, index) => (

                <div className="threeDays" key={index}>

             <h2>3-Day Forecast</h2>

                    <p className="icon">{WeatherIcons[day.icon]}</p>

                    <p>
                        Date: {day.datetime}
                    </p>

                    <p>
                        Temperature: {day.temp}°
                        {unit === "metric" ? "C" : "F"}
                    </p>

                    <p>
                        Feels Like: {day.feelslike}°
                        {unit === "metric" ? "C" : "F"}
                    </p>

                    <p>
                        Condition: {day.conditions}
                    </p>

                    <p>
                        Humidity: {day.humidity}%
                    </p>

                    <p>
                        Wind: {day.windspeed}
                        {unit === "metric" ? " km/h" : " mph"}
                    </p>

                    <p>
                        Wind Direction: {day.winddir}°
                    </p>

                    <p>
                        Pressure: {day.pressure} mb
                    </p>

                    <p>
                        Visibility: {day.visibility}
                        {unit === "metric" ? " km" : " mi"}
                    </p>

                    <p>
                        Precipitation: {day.precip}
                        {unit === "metric" ? " mm" : " in"}
                    </p>

                    <p>
                        Precipitation Probability: {day.precipprob}%
                    </p>

                    <p>
                        Snow: {day.snow}
                        {unit === "metric" ? " cm" : " in"}
                    </p>

                    <p>
                        Cloud Cover: {day.cloudcover}%
                    </p>

                    <p>
                        UV Index: {day.uvindex}
                    </p>


                    {/* Three-Day Forecast မှာပဲ ထပ်ပါတဲ့အချက်များ */}

                    <p>
                        Maximum Temperature: {day.tempmax}°
                        {unit === "metric" ? "C" : "F"}
                    </p>

                    <p>
                        Minimum Temperature: {day.tempmin}°
                        {unit === "metric" ? "C" : "F"}
                    </p>

                    <p>
                        Maximum Feels Like: {day.feelslikemax}°
                        {unit === "metric" ? "C" : "F"}
                    </p>

                    <p>
                        Minimum Feels Like: {day.feelslikemin}°
                        {unit === "metric" ? "C" : "F"}
                    </p>

                    <p>
                        Sunrise: {new Date(`1970-01-01T${day.sunrise}`).toLocaleTimeString("en-US",{
                        hour : "2-digit",
                      minute : "2-digit",
                      second : "2-digit",
                      hour12 : true
})}
                    </p>

                    <p>
                        Sunset: {new Date(`1970-01-01T${day.sunset}`).toLocaleTimeString("en-US",{
                        hour : "2-digit",
                      minute : "2-digit",
                      second : "2-digit",
                      hour12 : true
})}
                    </p>

                </div>

            ))}

        </div>
    );
};
