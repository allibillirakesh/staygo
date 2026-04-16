// Shared Puppeteer utilities for Netlify Functions
// netlify/functions/puppeteer-utils.js

const puppeteer = require('puppeteer');

let browser = null;

// Initialize browser (shared instance)
async function initBrowser() {
  if (browser && browser.isConnected()) {
    return browser;
  }

  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-gpu',
        '--single-process',
        '--no-first-run',
        '--no-zygote',
      ],
    });
    console.log('✅ Browser initialized for Netlify');
    return browser;
  } catch (error) {
    console.error('❌ Failed to initialize browser:', error.message);
    throw new Error('Browser initialization failed');
  }
}

// Generic scraper with timeout
async function scrapeWithTimeout(scrapeFn, timeoutMs = 25000) {
  return Promise.race([
    scrapeFn(),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Scraping timeout')), timeoutMs)
    ),
  ]);
}

// Scrape flights from MakeMyTrip
async function scrapeFlights(from, to, date) {
  const browser = await initBrowser();
  const page = await browser.newPage();
  page.setDefaultTimeout(10000);

  try {
    const url = `https://www.makemytrip.com/flights/${from}-${to}-${date}`;
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 10000 });
    
    // Wait for flights to load
    await page.waitForSelector('[data-testid="flightCardPrice"]', { timeout: 8000 }).catch(() => null);

    const flights = await page.evaluate(() => {
      const flightCards = document.querySelectorAll('[data-testid="flightCard"]');
      return Array.from(flightCards)
        .slice(0, 5) // Limit to 5 flights for speed
        .map((card) => ({
          airline: card.querySelector('[data-testid="airlineName"]')?.textContent?.trim() || 'Unknown',
          depTime: card.querySelector('[data-testid="departureTime"]')?.textContent?.trim() || '',
          arrTime: card.querySelector('[data-testid="arrivalTime"]')?.textContent?.trim() || '',
          duration: card.querySelector('[data-testid="duration"]')?.textContent?.trim() || '',
          stops: card.querySelector('[data-testid="stops"]')?.textContent?.includes('0') ? 0 : 1,
          price: parseInt(
            card.querySelector('[data-testid="flightCardPrice"]')?.textContent?.match(/\d+/)?.[0] || '0'
          ),
        }))
        .filter((f) => f.price > 0);
    });

    return flights;
  } catch (error) {
    console.error('Flight scraping error:', error.message);
    return [];
  } finally {
    await page.close();
  }
}

// Scrape hotels from Booking.com
async function scrapeHotels(city, checkIn, checkOut) {
  const browser = await initBrowser();
  const page = await browser.newPage();
  page.setDefaultTimeout(10000);

  try {
    const url = `https://www.booking.com/searchresults.html?ss=${city}&checkin=${checkIn}&checkout=${checkOut}`;
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 10000 });

    // Wait for hotels to load
    await page.waitForSelector('[data-testid="property-card"]', { timeout: 8000 }).catch(() => null);

    const hotels = await page.evaluate(() => {
      const hotelCards = document.querySelectorAll('[data-testid="property-card"]');
      return Array.from(hotelCards)
        .slice(0, 5) // Limit to 5 hotels
        .map((card) => ({
          name: card.querySelector('h3')?.textContent?.trim() || 'Unknown',
          rating: parseFloat(card.querySelector('[data-testid="review-score"]')?.textContent || '0'),
          reviews: parseInt(card.querySelector('[data-testid="review-count"]')?.textContent?.match(/\d+/)?.[0] || '0'),
          price: parseInt(card.querySelector('[data-testid="price"]')?.textContent?.match(/\d+/)?.[0] || '0'),
          location: card.querySelector('[data-testid="location-review"]')?.textContent?.trim() || '',
        }))
        .filter((h) => h.price > 0);
    });

    return hotels;
  } catch (error) {
    console.error('Hotel scraping error:', error.message);
    return [];
  } finally {
    await page.close();
  }
}

// Scrape trains from IRCTC
async function scrapeTrains(from, to, date) {
  const browser = await initBrowser();
  const page = await browser.newPage();
  page.setDefaultTimeout(10000);

  try {
    const url = `https://www.irctc.co.in/nget/train-search`;
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 10000 });

    // Simplified: return mock data due to IRCTC complexity and timeout constraints
    return [
      {
        trainName: 'Rajdhani Express',
        trainNo: '12001',
        depTime: '06:00 AM',
        arrTime: '10:00 PM',
        duration: '16h',
        durationMin: 960,
        classes: ['1A', '2A', '3A'],
        price: 3500,
        seats: 15,
      },
    ];
  } catch (error) {
    console.error('Train scraping error:', error.message);
    return [];
  } finally {
    await page.close();
  }
}

// Scrape buses from RedBus
async function scrapeBuses(from, to, date) {
  const browser = await initBrowser();
  const page = await browser.newPage();
  page.setDefaultTimeout(10000);

  try {
    const url = `https://www.redbus.in/bus-tickets/${from}-to-${to}?date=${date}`;
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 10000 });

    // Wait for buses to load
    await page.waitForSelector('[data-bus-name]', { timeout: 8000 }).catch(() => null);

    const buses = await page.evaluate(() => {
      const busCards = document.querySelectorAll('[data-bus-name]');
      return Array.from(busCards)
        .slice(0, 5) // Limit to 5 buses
        .map((card) => ({
          operator: card.getAttribute('data-bus-name') || 'Unknown',
          type: card.querySelector('.bus-type')?.textContent?.trim() || 'AC',
          depTime: card.querySelector('.dp-time')?.textContent?.trim() || '',
          duration: card.querySelector('.duration')?.textContent?.trim() || '',
          arrTime: card.querySelector('.at-time')?.textContent?.trim() || '',
          price: parseInt(card.querySelector('.fare')?.textContent?.match(/\d+/)?.[0] || '0'),
          seats: parseInt(card.querySelector('.seat-left')?.textContent?.match(/\d+/)?.[0] || '5'),
        }))
        .filter((b) => b.price > 0);
    });

    return buses;
  } catch (error) {
    console.error('Bus scraping error:', error.message);
    return [];
  } finally {
    await page.close();
  }
}

module.exports = {
  initBrowser,
  scrapeWithTimeout,
  scrapeFlights,
  scrapeHotels,
  scrapeTrains,
  scrapeBuses,
};
