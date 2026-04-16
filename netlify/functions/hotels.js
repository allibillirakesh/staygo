// Hotels endpoint
// netlify/functions/hotels.js

const { scrapeWithTimeout, scrapeHotels } = require('./puppeteer-utils');

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { city, checkIn, checkOut } = event.queryStringParameters || {};

    if (!city || !checkIn || !checkOut) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing parameters: city, checkIn, checkOut' }),
      };
    }

    console.log(`🏨 Scraping hotels in ${city} from ${checkIn} to ${checkOut}`);

    const hotels = await scrapeWithTimeout(async () => {
      return await scrapeHotels(city, checkIn, checkOut);
    }, 24000);

    const formattedHotels = hotels.map((hotel, idx) => ({
      id: `hotel-${idx}`,
      type: 'hotel',
      name: hotel.name,
      city,
      location: hotel.location || city,
      rating: hotel.rating,
      reviews: hotel.reviews,
      prices: [{ price: hotel.price, platform: 'Booking.com' }],
      bestPrice: hotel.price,
      bestPlatform: 'Booking.com',
      amenities: ['WiFi', 'AC', 'Parking'],
      imageUrl: `https://via.placeholder.com/300x200?text=${encodeURIComponent(hotel.name)}`,
    }));

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        success: true,
        count: formattedHotels.length,
        data: formattedHotels,
      }),
    };
  } catch (error) {
    console.error('Hotels error:', error.message);
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
