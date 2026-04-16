// Flights endpoint
// netlify/functions/flights.js

const { scrapeWithTimeout, scrapeFlights } = require('./puppeteer-utils');

exports.handler = async (event, context) => {
  // Set longer timeout for Netlify
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { from, to, date } = event.queryStringParameters || {};

    if (!from || !to || !date) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing parameters: from, to, date' }),
      };
    }

    console.log(`✈️  Scraping flights: ${from} → ${to} on ${date}`);

    const flights = await scrapeWithTimeout(async () => {
      return await scrapeFlights(from, to, date);
    }, 24000); // 24 second timeout

    const formattedFlights = flights.map((flight, idx) => ({
      id: `flight-${idx}`,
      type: 'flight',
      name: flight.airline,
      code: flight.airline.substring(0, 2).toUpperCase(),
      from,
      to,
      depTime: flight.depTime,
      arrTime: flight.arrTime,
      duration: flight.duration,
      durationMin: flight.durationMin || 180,
      stops: flight.stops,
      stopsText: flight.stops === 0 ? 'Nonstop' : `${flight.stops} Stop`,
      prices: [{ price: flight.price, platform: 'MakeMyTrip' }],
      bestPrice: flight.price,
      bestPlatform: 'MakeMyTrip',
      amenities: ['WiFi', 'Meals'],
      rating: 4.5,
    }));

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        success: true,
        count: formattedFlights.length,
        data: formattedFlights,
      }),
    };
  } catch (error) {
    console.error('Flights error:', error.message);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        error: error.message,
        data: [],
      }),
    };
  }
};
