import express from "express";
import rateLimit from "express-rate-limit";

const app = express();

const apiLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 10,
    message: {
        error: "Too many requests. Please wait one minute!"
    }
});

app.get("/", apiLimiter, async (req, res) => {
    try {
        const query = req.query.query;
        const unit = req.query.unit;

        const apiKey = process.env.WEATHER_API_KEY;

        const weatherRes = await fetch(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(query)}?unitGroup=${unit}&key=${apiKey}`
        );

        if (!weatherRes.ok) {
            throw new Error("weather data is not available");
        }

        const data = await weatherRes.json();

        res.json({ data });

    } catch (err) {
        console.log(err);

        res.status(500).json({
            error: "Weather data is not available now! Please try again!"
        });
    }
});

export default app;
