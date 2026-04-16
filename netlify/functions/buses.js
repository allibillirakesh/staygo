// Buses endpoint
// netlify/functions/buses.js

const { scrapeWithTimeout, scrapeBuses } = require('./puppeteer-utils');

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { from, to, date } = event.queryStringParameters || {};

    if (!from || !to || !date) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing parameters: from, to, date' }),
      };
    }

    console.log(`🚌 Scraping buses: ${from} → ${to} on ${date}`);

    const buses = await scrapeWithTimeout(async () => {
      return await scrapeBuses(from, to, date);
    }, 24000);

    const formattedBuses = buses.map((bus, idx) => ({
      id: `bus-${idx}`,
      type: 'bus',
      operator: bus.operator,
      busType: bus.type,
      from,
      to,
      depTime: bus.depTime,
      arrTime: bus.arrTime,
      duration: bus.duration,
      durationMin: 600,
      prices: [{ price: bus.price, platform: 'RedBus' }],
      bestPrice: bus.price,
      bestPlatform: 'RedBus',
      seats: bus.seats,
      amenities: ['WiFi', 'Charging', 'Blanket'],
      rating: 4.3,
    }));

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        success: true,
        count: formattedBuses.length,
        data: formattedBuses,
      }),
    };
  } catch (error) {
    console.error('Buses error:', error.message);
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
