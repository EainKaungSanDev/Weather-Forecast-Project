export default async function handler(req, res) {
    try {
        const query = req.query.query;
        const unit = req.query.unit;

        const apiKey = process.env.WEATHER_API_KEY;

        const weatherRes = await fetch(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(query)}?unitGroup=${unit}&key=${apiKey}`
        );

        if (!weatherRes.ok) {
            throw new Error("Weather data is not available");
        }

        const data = await weatherRes.json();

        return res.status(200).json({ data });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            error: "Weather data is not available now! Please try again!"
        });
    }
}
