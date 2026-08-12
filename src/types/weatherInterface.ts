export interface Weather {
    address: string,

    currentConditions: {
        datetime: string,
        temp: number,
        feelslike: number,
        humidity: number,
        precip: number,
        snow: number,
        windspeed: number,
        winddir: number,
        cloudcover: number,
        uvindex: number,
        pressure: number,
        visibility: number,
        conditions: string,
        icon: string
    },

    days: {
        datetime: string,
        tempmax: number,
        tempmin: number,
        temp: number,
        feelslikemax: number,
        feelslikemin: number,
        feelslike: number,
        humidity: number,
        precip: number,
        precipprob: number,
        snow: number,
        windspeed: number,
        winddir: number,
        cloudcover: number,
        uvindex: number,
        pressure: number,
        visibility: number,
        conditions: string,
        icon: string,
        sunrise: string,
        sunset: string,

        hours: {
            datetime: string,
            temp: number,
            feelslike: number,
            humidity: number,
            precip: number,
            precipprob: number,
            snow: number,
            windspeed: number,
            winddir: number,
            cloudcover: number,
            uvindex: number,
            pressure: number,
            visibility: number,
            conditions: string,
            icon: string
        }[]
    }[]
}
