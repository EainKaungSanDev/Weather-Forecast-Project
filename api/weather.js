const requests = new Map();

const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 10;

export default async function handler(req, res) {

    const ip =
        req.headers["x-forwarded-for"]?.split(",")[0] ||
        req.socket?.remoteAddress ||
        "unknown";

    const now = Date.now();

    const record = requests.get(ip);

    if (!record || now - record.start >= WINDOW_MS) {

        requests.set(ip, {
            start: now,
            count: 1
        });

    } else {

        record.count++;

        if (record.count > MAX_REQUESTS) {

            return res.status(429).json({
                error: "Too many requests. Please wait one minute!"
            });

        }
    }


    try {

        const query = req.query.query;
        const unit = req.query.unit;

        if (!query) {
            return res.status(400).json({
                error: "Query is required"
            });
        }

        const apiKey = process.env.WEATHER_API_KEY;

        const weatherRes = await fetch(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(query)}?unitGroup=${unit}&key=${apiKey}`
        );

        if (!weatherRes.ok) {
            throw new Error("Weather data is not available");
        }

        const data = await weatherRes.json();

        return res.status(200).json({
            data
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            error: "Weather data is not available now! Please try again!"
        });

    }
}
