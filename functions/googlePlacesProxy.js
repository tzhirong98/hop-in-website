const fetch = require("node-fetch");

exports.handler = async (event) => {
  const GOOGLE_MAP_API_KEY = process.env.GOOGLE_MAP_API_KEY; // Securely access the API key

  const { placeId } = JSON.parse(event.body); // Get the place ID from the request body
  if (!placeId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Place ID is required" }),
    };
  }

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_MAP_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("Error fetching place details:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
