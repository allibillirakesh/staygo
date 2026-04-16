// ============================
// StayGo Backend Server
// Fetches real-time travel data using Puppeteer
// ============================

const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Store browser instance for reuse
let browser;

// Initialize Puppeteer browser
async function initBrowser() {
  if (!browser) {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
  }
  return browser;
}

// ==================== FLIGHT SCRAPING ====================
async function scrapeFlights(from, to, date) {
  try {
    const browser = await initBrowser();
    const page = await browser.newPage();
    
    // Set user agent to avoid blocking
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
    
    // Timeout settings
    await page.setDefaultNavigationTimeout(30000);
    await page.setDefaultTimeout(10000);
    
    // Navigate to flight search
    const url = `https://www.makemytrip.com/flights/${from}-${to}?depart_date=${date}`;
    await page.goto(url, { waitUntil: 'networkidle2' });
    
    // Wait for flight results to load
    await page.waitForSelector('.fli-list', { timeout: 15000 }).catch(() => null);
    
    // Extract flight data
    const flights = await page.evaluate(() => {
      const results = [];
      const flightCards = document.querySelectorAll('.fli-list');
      
      flightCards.forEach((card, idx) => {
        if (idx >= 12) return; // Limit to 12 results
        
        try {
          const airline = card.querySelector('.airline-name')?.textContent?.trim() || 'Unknown';
          const depTime = card.querySelector('.dep-time')?.textContent?.trim() || '00:00';
          const arrTime = card.querySelector('.arr-time')?.textContent?.trim() || '00:00';
          const duration = card.querySelector('.duration')?.textContent?.trim() || '0h 0m';
          const stops = card.querySelector('.stops')?.textContent?.trim() || 'Non-stop';
          const price = card.querySelector('.price')?.textContent?.replace(/[^\d]/g, '') || '5000';
          
          results.push({
            airline,
            depTime,
            arrTime,
            duration,
            stops,
            price: parseInt(price),
            link: card.querySelector('a')?.href || '#'
          });
        } catch (e) {
          console.log('Error parsing flight card:', e.message);
        }
      });
      
      return results;
    });
    
    await page.close();
    return flights;
  } catch (error) {
    console.error('❌ Flight scraping failed:', error.message);
    return null;
  }
}

// ==================== HOTEL SCRAPING ====================
async function scrapeHotels(city, checkIn, checkOut) {
  try {
    const browser = await initBrowser();
    const page = await browser.newPage();
    
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
    await page.setDefaultNavigationTimeout(30000);
    await page.setDefaultTimeout(10000);
    
    // Navigate to hotel search
    const url = `https://www.makemytrip.com/hotels/${city}?checkin=${checkIn}&checkout=${checkOut}`;
    await page.goto(url, { waitUntil: 'networkidle2' });
    
    // Wait for hotel results
    await page.waitForSelector('.hotelCardImg', { timeout: 15000 }).catch(() => null);
    
    // Extract hotel data
    const hotels = await page.evaluate(() => {
      const results = [];
      const hotelCards = document.querySelectorAll('.hotelCardImg');
      
      hotelCards.forEach((card, idx) => {
        if (idx >= 10) return; // Limit to 10 results
        
        try {
          const name = card.querySelector('.hotelName')?.textContent?.trim() || 'Unknown Hotel';
          const location = card.querySelector('.locality')?.textContent?.trim() || 'Unknown Location';
          const rating = card.querySelector('.rating')?.textContent?.trim() || '4.0';
          const reviews = card.querySelector('.reviews')?.textContent?.trim() || '0';
          const price = card.querySelector('.price')?.textContent?.replace(/[^\d]/g, '') || '3000';
          const image = card.querySelector('img')?.src || '';
          const amenities = Array.from(card.querySelectorAll('.amenity'))
            .map(a => a.textContent?.trim())
            .filter(a => a);
          
          results.push({
            name,
            location,
            rating: parseFloat(rating),
            reviews: parseInt(reviews),
            price: parseInt(price),
            image,
            amenities: amenities.slice(0, 4),
            link: card.querySelector('a')?.href || '#'
          });
        } catch (e) {
          console.log('Error parsing hotel card:', e.message);
        }
      });
      
      return results;
    });
    
    await page.close();
    return hotels;
  } catch (error) {
    console.error('❌ Hotel scraping failed:', error.message);
    return null;
  }
}

// ==================== TRAIN SCRAPING ====================
async function scrapeTrains(from, to, date) {
  try {
    const browser = await initBrowser();
    const page = await browser.newPage();
    
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
    await page.setDefaultNavigationTimeout(30000);
    await page.setDefaultTimeout(10000);
    
    // Navigate to train search (IRCTC format)
    const url = `https://www.makemytrip.com/trains/${from}-${to}?date=${date}`;
    await page.goto(url, { waitUntil: 'networkidle2' });
    
    // Wait for train results
    await page.waitForSelector('.train-list-item', { timeout: 15000 }).catch(() => null);
    
    // Extract train data
    const trains = await page.evaluate(() => {
      const results = [];
      const trainCards = document.querySelectorAll('.train-list-item');
      
      trainCards.forEach((card, idx) => {
        if (idx >= 10) return; // Limit to 10 results
        
        try {
          const trainName = card.querySelector('.train-name')?.textContent?.trim() || 'Unknown Train';
          const trainNo = card.querySelector('.train-number')?.textContent?.trim() || '12345';
          const depTime = card.querySelector('.dep-time')?.textContent?.trim() || '00:00';
          const arrTime = card.querySelector('.arr-time')?.textContent?.trim() || '00:00';
          const duration = card.querySelector('.duration')?.textContent?.trim() || '0h 0m';
          const price = card.querySelector('.price')?.textContent?.replace(/[^\d]/g, '') || '500';
          const classes = card.querySelector('.classes')?.textContent?.trim() || 'SL';
          
          results.push({
            trainName,
            trainNo,
            depTime,
            arrTime,
            duration,
            price: parseInt(price),
            classes,
            link: card.querySelector('a')?.href || '#'
          });
        } catch (e) {
          console.log('Error parsing train card:', e.message);
        }
      });
      
      return results;
    });
    
    await page.close();
    return trains;
  } catch (error) {
    console.error('❌ Train scraping failed:', error.message);
    return null;
  }
}

// ==================== BUS SCRAPING ====================
async function scrapeBuses(from, to, date) {
  try {
    const browser = await initBrowser();
    const page = await browser.newPage();
    
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
    await page.setDefaultNavigationTimeout(30000);
    await page.setDefaultTimeout(10000);
    
    // Navigate to bus search (RedBus format)
    const url = `https://www.redbus.in/buses/${from.toLowerCase()}-${to.toLowerCase()}/?&onward=${date}`;
    await page.goto(url, { waitUntil: 'networkidle2' });
    
    // Wait for bus results
    await page.waitForSelector('[data-bus-name]', { timeout: 15000 }).catch(() => null);
    
    // Extract bus data
    const buses = await page.evaluate(() => {
      const results = [];
      const busCards = document.querySelectorAll('[data-bus-name]');
      
      busCards.forEach((card, idx) => {
        if (idx >= 10) return; // Limit to 10 results
        
        try {
          const busName = card.getAttribute('data-bus-name') || 'Unknown Bus';
          const depTime = card.querySelector('.dp-time')?.textContent?.trim() || '00:00';
          const arrTime = card.querySelector('.bp-time')?.textContent?.trim() || '00:00';
          const duration = card.querySelector('.duration')?.textContent?.trim() || '0h 0m';
          const price = card.querySelector('.fare')?.textContent?.replace(/[^\d]/g, '') || '500';
          const busType = card.querySelector('.bus-type')?.textContent?.trim() || 'Non-AC';
          const rating = card.querySelector('.rating')?.textContent?.trim() || '0';
          
          results.push({
            busName,
            depTime,
            arrTime,
            duration,
            price: parseInt(price),
            busType,
            rating: parseFloat(rating),
            link: card.querySelector('a')?.href || '#'
          });
        } catch (e) {
          console.log('Error parsing bus card:', e.message);
        }
      });
      
      return results;
    });
    
    await page.close();
    return buses;
  } catch (error) {
    console.error('❌ Bus scraping failed:', error.message);
    return null;
  }
}

// ==================== API ENDPOINTS ====================

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Server running', timestamp: new Date().toISOString() });
});

// Flights endpoint
app.get('/api/flights', async (req, res) => {
  try {
    const { from, to, date } = req.query;
    
    if (!from || !to || !date) {
      return res.status(400).json({ error: 'Missing parameters: from, to, date' });
    }
    
    console.log(`📊 Scraping flights: ${from} → ${to} on ${date}`);
    const flights = await scrapeFlights(from, to, date);
    
    if (!flights || flights.length === 0) {
      return res.status(404).json({ error: 'No flights found', data: [] });
    }
    
    res.json({ success: true, data: flights, count: flights.length });
  } catch (error) {
    console.error('Flight API error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Hotels endpoint
app.get('/api/hotels', async (req, res) => {
  try {
    const { city, checkIn, checkOut } = req.query;
    
    if (!city || !checkIn || !checkOut) {
      return res.status(400).json({ error: 'Missing parameters: city, checkIn, checkOut' });
    }
    
    console.log(`🏨 Scraping hotels: ${city} from ${checkIn} to ${checkOut}`);
    const hotels = await scrapeHotels(city, checkIn, checkOut);
    
    if (!hotels || hotels.length === 0) {
      return res.status(404).json({ error: 'No hotels found', data: [] });
    }
    
    res.json({ success: true, data: hotels, count: hotels.length });
  } catch (error) {
    console.error('Hotel API error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Trains endpoint
app.get('/api/trains', async (req, res) => {
  try {
    const { from, to, date } = req.query;
    
    if (!from || !to || !date) {
      return res.status(400).json({ error: 'Missing parameters: from, to, date' });
    }
    
    console.log(`🚆 Scraping trains: ${from} → ${to} on ${date}`);
    const trains = await scrapeTrains(from, to, date);
    
    if (!trains || trains.length === 0) {
      return res.status(404).json({ error: 'No trains found', data: [] });
    }
    
    res.json({ success: true, data: trains, count: trains.length });
  } catch (error) {
    console.error('Train API error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Buses endpoint
app.get('/api/buses', async (req, res) => {
  try {
    const { from, to, date } = req.query;
    
    if (!from || !to || !date) {
      return res.status(400).json({ error: 'Missing parameters: from, to, date' });
    }
    
    console.log(`🚌 Scraping buses: ${from} → ${to} on ${date}`);
    const buses = await scrapeBuses(from, to, date);
    
    if (!buses || buses.length === 0) {
      return res.status(404).json({ error: 'No buses found', data: [] });
    }
    
    res.json({ success: true, data: buses, count: buses.length });
  } catch (error) {
    console.error('Bus API error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down server...');
  if (browser) {
    await browser.close();
  }
  process.exit(0);
});

// Start server
app.listen(PORT, () => {
  console.log(`\n✅ StayGo Backend Server running on http://localhost:${PORT}`);
  console.log(`📊 Available endpoints:`);
  console.log(`   GET /health - Server health check`);
  console.log(`   GET /api/flights?from=DEL&to=BOM&date=2026-04-20 - Scrape flights`);
  console.log(`   GET /api/hotels?city=Goa&checkIn=2026-04-20&checkOut=2026-04-22 - Scrape hotels`);
  console.log(`   GET /api/trains?from=DEL&to=BOM&date=2026-04-20 - Scrape trains`);
  console.log(`   GET /api/buses?from=Delhi&to=Mumbai&date=2026-04-20 - Scrape buses`);
  console.log(`\n🔗 Frontend will call these endpoints for real-time data\n`);
});
