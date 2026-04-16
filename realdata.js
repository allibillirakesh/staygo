// ============================
// StayGo — Real-Time Data Integration
// Fetches actual travel data using Netlify Functions (or local Puppeteer backend)
// ============================

// Backend server URL - empty for Netlify, or 'http://localhost:3000' for local development
const BACKEND_URL = typeof window !== 'undefined' && window.location.hostname === 'localhost'
  ? 'http://localhost:3000'
  : ''; // Use same domain for Netlify Functions

/**
 * Check backend server status
 */
async function checkBackendStatus() {
  try {
    const healthUrl = BACKEND_URL ? `${BACKEND_URL}/health` : '/.netlify/functions/health';
    const response = await fetch(healthUrl);
    return response.ok;
  } catch (error) {
    return false;
  }
}

/**
 * Helper: Build API URL for both local and Netlify deployment
 */
function getApiUrl(endpoint) {
  if (BACKEND_URL) {
    // Local development
    return `${BACKEND_URL}${endpoint}`;
  } else {
    // Netlify Functions - endpoint becomes function name
    const functionName = endpoint.replace(/^\/api\//, '').split('?')[0];
    const params = endpoint.includes('?') ? '?' + endpoint.split('?')[1] : '';
    return `/.netlify/functions/${functionName}${params}`;
  }
}

/**
 * Real-time flight data from Puppeteer backend
 * Backend scrapes MakeMyTrip, Goibibo, etc.
 */
async function fetchRealFlights(fromCity, toCity, date) {
  try {
    console.log(`✈️  Fetching flights from backend: ${fromCity} → ${toCity}`);
    
    // Get airport codes
    const fromCode = INDIAN_CITIES.find(c => c.name.toLowerCase() === fromCity.toLowerCase())?.code || fromCity;
    const toCode = INDIAN_CITIES.find(c => c.name.toLowerCase() === toCity.toLowerCase())?.code || toCity;
    
    // Format date for API (YYYY-MM-DD)
    const dateStr = date instanceof Date ? date.toISOString().split('T')[0] : date;
    
    const url = getApiUrl(`/api/flights?from=${fromCode}&to=${toCode}&date=${dateStr}`);
    const response = await fetch(url, { method: 'GET' });
    
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    
    const result = await response.json();
    console.log(`✅ Got ${result.count || 0} flights from backend`);
    
    // Transform backend data to app format
    return result.data?.map((flight, idx) => ({
      type: 'flight',
      name: flight.name || flight.airline,
      code: flight.code || `${flight.airline?.substring(0, 2).toUpperCase()}-${1000 + idx}`,
      from: `${fromCity}`,
      to: `${toCity}`,
      depTime: flight.depTime,
      arrTime: flight.arrTime,
      duration: flight.duration,
      durationMin: flight.durationMin || parseInt(flight.duration) * 60,
      stops: flight.stops,
      stopsText: flight.stopsText || (flight.stops === 0 ? 'Nonstop' : `${flight.stops} Stop`),
      prices: { [flight.bestPlatform]: flight.bestPrice },
      bestPrice: flight.bestPrice,
      bestPlatform: flight.bestPlatform,
      sortedPrices: [[flight.bestPlatform, flight.bestPrice]],
      amenities: flight.amenities || ['Free WiFi', 'Meal Included'],
      rating: flight.rating || (3.5 + Math.random() * 1.3).toFixed(1),
      source: 'realtime'
    })) || null;
  } catch (error) {
    console.error('❌ Real flight data unavailable:', error.message);
    return null;
  }
}

/**
 * Real-time hotel data from Puppeteer backend
 * Backend scrapes MakeMyTrip, Booking.com, etc.
 */
async function fetchRealHotels(cityName, checkInDate, checkOutDate) {
  try {
    console.log(`🏨 Fetching hotels from backend: ${cityName}`);
    
    const url = getApiUrl(`/api/hotels?city=${cityName}&checkIn=${checkInDate}&checkOut=${checkOutDate}`);
    const response = await fetch(url, { method: 'GET' });
    
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    
    const result = await response.json();
    console.log(`✅ Got ${result.count || 0} hotels from backend`);
    
    // Transform backend data to app format
    return result.data?.map((hotel, idx) => ({
      type: 'hotel',
      name: hotel.name,
      stars: hotel.rating >= 4.5 ? 5 : hotel.rating >= 4 ? 4 : 3,
      location: hotel.location || `${cityName}, India`,
      image: hotel.image || 'https://via.placeholder.com/300x200?text=Hotel+Image',
      prices: { [hotel.name]: hotel.price },
      bestPrice: hotel.price,
      bestPlatform: hotel.name,
      sortedPrices: [[hotel.name, hotel.price]],
      amenities: hotel.amenities || ['WiFi', 'Parking', 'AC', 'Restaurant'],
      rating: (hotel.rating || 4.0).toFixed(1),
      reviews: hotel.reviews || Math.floor(Math.random() * 500) + 100,
      description: `Experience comfort at ${hotel.name}. Located in ${hotel.location} with modern amenities.`,
      source: 'realtime'
    })) || null;
  } catch (error) {
    console.error('❌ Real hotel data unavailable:', error.message);
    return null;
  }
}

/**
 * Real-time train data from Puppeteer backend
 * Backend scrapes IRCTC, MakeMyTrip trains
 */
async function fetchRealTrains(fromStation, toStation, date) {
  try {
    console.log(`🚆 Fetching trains from backend: ${fromStation} → ${toStation}`);
    
    const fromCode = INDIAN_CITIES.find(c => c.name.toLowerCase() === fromStation.toLowerCase())?.code || fromStation;
    const toCode = INDIAN_CITIES.find(c => c.name.toLowerCase() === toStation.toLowerCase())?.code || toStation;
    
    const url = getApiUrl(`/api/trains?from=${fromCode}&to=${toCode}&date=${date}`);
    const response = await fetch(url, { method: 'GET' });
    
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    
    const result = await response.json();
    console.log(`✅ Got ${result.count || 0} trains from backend`);
    
    // Transform backend data to app format
    return result.data?.map((train, idx) => ({
      type: 'train',
      name: train.name || train.trainName,
      code: train.code || train.trainNo,
      from: fromStation,
      fromCode: fromCode,
      to: toStation,
      toCode: toCode,
      depTime: train.depTime,
      arrTime: train.arrTime,
      duration: train.duration,
      durationMin: train.durationMin || parseInt(train.duration) * 60,
      classes: train.classes || [
        { code: 'SL', name: 'Sleeper', price: train.bestPrice, avail: 60 },
        { code: '3A', name: 'AC 3 Tier', price: Math.round(train.bestPrice * 1.5), avail: 40 },
        { code: '2A', name: 'AC 2 Tier', price: Math.round(train.bestPrice * 2.2), avail: 30 }
      ],
      prices: { [train.bestPlatform]: train.bestPrice },
      bestPrice: train.bestPrice,
      bestPlatform: train.bestPlatform || 'IRCTC',
      sortedPrices: [[train.bestPlatform || 'IRCTC', train.bestPrice]],
      rating: train.rating || (3.8 + Math.random() * 0.7).toFixed(1),
      amenities: train.amenities || ['Free Meal', 'Blanket & Pillow', 'Pantry Car'],
      seats: train.seats,
      source: 'realtime'
    })) || null;
  } catch (error) {
    console.error('❌ Real train data unavailable:', error.message);
    return null;
  }
}

/**
 * Real-time bus data from Puppeteer backend
 * Backend scrapes RedBus, AbhiBus, etc.
 */
async function fetchRealBuses(fromCity, toCity, date) {
  try {
    console.log(`🚌 Fetching buses from backend: ${fromCity} → ${toCity}`);
    
    const url = getApiUrl(`/api/buses?from=${fromCity}&to=${toCity}&date=${date}`);
    const response = await fetch(url, { method: 'GET' });
    
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    
    const result = await response.json();
    console.log(`✅ Got ${result.count || 0} buses from backend`);
    
    // Transform backend data to app format
    return result.data?.map((bus, idx) => ({
      type: 'bus',
      name: bus.operator || bus.name || bus.busName,
      busType: bus.busType,
      from: fromCity,
      to: toCity,
      depTime: bus.depTime,
      arrTime: bus.arrTime,
      duration: bus.duration,
      durationMin: bus.durationMin || parseInt(bus.duration) * 60,
      prices: { [bus.bestPlatform]: bus.bestPrice },
      bestPrice: bus.bestPrice,
      bestPlatform: bus.bestPlatform || 'RedBus',
      sortedPrices: [[bus.bestPlatform || 'RedBus', bus.bestPrice]],
      amenities: bus.amenities || ['WiFi', 'Charging Point', 'Water', 'Blanket'],
      rating: bus.rating || (4.2).toFixed(1),
      seats: bus.seats || Math.floor(Math.random() * 30) + 5,
      source: 'realtime'
    })) || null;
  } catch (error) {
    console.error('❌ Real bus data unavailable:', error.message);
    return null;
  }
}

/**
 * Setup instructions for Puppeteer backend
 */
function setupRealDataIntegration() {
  console.log(`
╔══════════════════════════════════════════════════════════════╗
║  📊 STAYGO REAL-TIME DATA - PUPPETEER BACKEND              ║
╚══════════════════════════════════════════════════════════════╝

🚀 OPTION 1: LOCAL DEVELOPMENT (2 minutes):

1️⃣  Install Node.js (if not already installed)
    → Visit: https://nodejs.org/
    → Download LTS version
    → Install and verify: node --version

2️⃣  Install dependencies
    → Open terminal in StayGo folder
    → Run: npm install
    → Wait for Puppeteer to download (~500MB)

3️⃣  Start the backend server
    → Run: npm start
    → You should see: "✅ StayGo Backend Server running on http://localhost:3000"

4️⃣  Reload the web app
    → Go back to browser
    → Refresh the page (F5)
    → Try a search - it will now fetch REAL data!

╔══════════════════════════════════════════════════════════════╗
║  ☁️  OPTION 2: DEPLOY TO NETLIFY (5 minutes):              ║
╚══════════════════════════════════════════════════════════════╝

1️⃣  Push to GitHub
    → Create repo and push code
    → GitHub repo link: https://github.com/

2️⃣  Connect to Netlify
    → Go to https://netlify.com
    → Click "New site from Git"
    → Connect GitHub account
    → Select StayGo repository
    → Deploy (Netlify Functions auto-setup!)

3️⃣  Done! Your site is now live
    → Netlify Functions handle API calls
    → Works from anywhere (no local server needed)

╔══════════════════════════════════════════════════════════════╗
║  🔗 API ENDPOINTS (Automatically called by frontend)        ║
╚══════════════════════════════════════════════════════════════╝

Local: http://localhost:3000/api/flights?from=DEL&to=BOM&date=2026-04-20
Netlify: https://yoursite.netlify.app/.netlify/functions/flights?from=DEL&to=BOM&date=2026-04-20

GET /api/flights?from=DEL&to=BOM&date=2026-04-20
GET /api/hotels?city=Goa&checkIn=2026-04-20&checkOut=2026-04-22
GET /api/trains?from=DEL&to=BOM&date=2026-04-20
GET /api/buses?from=Delhi&to=Mumbai&date=2026-04-20

╔══════════════════════════════════════════════════════════════╗
║  🎯 DATA SOURCES (Scraped in Real-Time)                    ║
╚══════════════════════════════════════════════════════════════╝

✈️  Flights     → MakeMyTrip, Goibibo, Cleartrip
🏨 Hotels      → MakeMyTrip, Booking.com, OYO
🚆 Trains      → IRCTC, MakeMyTrip, Confirmtkt  
🚌 Buses       → RedBus, AbhiBus, Yatra

✅ FULLY AUTOMATED - NO API KEYS NEEDED!
  `);
}

const REAL_DATA_CONFIG = {
  provider: 'Puppeteer Backend Scraper',
  apiUrl: BACKEND_URL,
  setupTime: '2 minutes',
  cost: 'Free (self-hosted)',
  requirements: 'Node.js 14+',
  documentation: setupRealDataIntegration,
  status: 'Ready for integration'
};
