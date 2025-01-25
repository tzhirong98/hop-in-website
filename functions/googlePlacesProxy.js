const fetch = require("node-fetch");

exports.handler = async (event) => {
  const { placeId } = JSON.parse(event.body);

  const GOOGLE_SERVER_API_KEY = process.env.GOOGLE_SERVER_API_KEY;
  console.log("GOOGLE_SERVER_API_KEY", GOOGLE_SERVER_API_KEY);
  
  if (!GOOGLE_SERVER_API_KEY) {
    console.error("Missing GOOGLE_SERVER_API_KEY in environment variables.");
  }
  const url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${GOOGLE_SERVER_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      return {
        statusCode: 200,
        body: JSON.stringify(data),
      };
    } else {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: data.error_message || "Unknown error" }),
      };
    }
  } catch (error) {
    console.error("Fetch error:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch place details" }),
    };
  }
};
