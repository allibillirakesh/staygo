// Trains endpoint
// netlify/functions/trains.js

const { scrapeWithTimeout, scrapeTrains } = require('./puppeteer-utils');

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

    console.log(`🚂 Scraping trains: ${from} → ${to} on ${date}`);

    const trains = await scrapeWithTimeout(async () => {
      return await scrapeTrains(from, to, date);
    }, 24000);

    const formattedTrains = trains.map((train, idx) => ({
      id: `train-${idx}`,
      type: 'train',
      name: train.trainName,
      code: train.trainNo,
      from,
      to,
      depTime: train.depTime,
      arrTime: train.arrTime,
      duration: train.duration,
      durationMin: train.durationMin,
      classes: train.classes,
      prices: [{ price: train.price, platform: 'IRCTC', class: '3A' }],
      bestPrice: train.price,
      bestPlatform: 'IRCTC',
      seats: train.seats,
      amenities: ['Bedding', 'Meals'],
      rating: 4.2,
    }));

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        success: true,
        count: formattedTrains.length,
        data: formattedTrains,
      }),
    };
  } catch (error) {
    console.error('Trains error:', error.message);
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
