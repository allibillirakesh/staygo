# 🚀 StayGo Backend - Puppeteer Real-Time Data Scraper

## Overview

StayGo uses **Puppeteer** to scrape real, live travel data from actual booking websites:
- ✈️ **Flights**: MakeMyTrip, Goibibo, Cleartrip  
- 🏨 **Hotels**: MakeMyTrip, Booking.com, OYO
- 🚆 **Trains**: IRCTC, MakeMyTrip, Confirmtkt
- 🚌 **Buses**: RedBus, AbhiBus, Yatra

**No API keys needed!** Just a backend server running Node.js with Puppeteer.

---

## ⚡ Quick Start (2 Minutes)

### Step 1: Install Node.js
- **Windows/Mac/Linux**: https://nodejs.org/ (Download LTS version)
- Verify: `node --version` in terminal

### Step 2: Install Dependencies
```bash
cd StayGo
npm install
```
This downloads Puppeteer and browser (~500MB), Express, and CORS middleware.

### Step 3: Start Backend Server
```bash
npm start
```

**Expected output:**
```
✅ StayGo Backend Server running on http://localhost:3000
📊 Available endpoints:
   GET /health - Server health check
   GET /api/flights?from=DEL&to=BOM&date=2026-04-20
   GET /api/hotels?city=Goa&checkIn=2026-04-20&checkOut=2026-04-22
   GET /api/trains?from=DEL&to=BOM&date=2026-04-20
   GET /api/buses?from=Delhi&to=Mumbai&date=2026-04-20
```

### Step 4: Reload Web App
- Go back to browser (index.html)
- Refresh page (F5)
- Try a search - **it now fetches REAL data!**

---

## 🔗 API Endpoints

### Health Check
```
GET http://localhost:3000/health
Response: { "status": "Server running", "timestamp": "..." }
```

### Fetch Flights
```
GET http://localhost:3000/api/flights?from=DEL&to=BOM&date=2026-04-20

Response:
{
  "success": true,
  "count": 12,
  "data": [
    {
      "airline": "IndiGo",
      "depTime": "06:30",
      "arrTime": "09:45",
      "duration": "3h 15m",
      "stops": "Non-stop",
      "price": 4500,
      "link": "https://makemytrip.com/..."
    },
    ...
  ]
}
```

### Fetch Hotels
```
GET http://localhost:3000/api/hotels?city=Goa&checkIn=2026-04-20&checkOut=2026-04-22

Response:
{
  "success": true,
  "count": 10,
  "data": [
    {
      "name": "The Taj",
      "location": "Baga Beach",
      "rating": 4.6,
      "reviews": 1250,
      "price": 5500,
      "image": "https://...",
      "amenities": ["WiFi", "Pool", "Spa"]
    },
    ...
  ]
}
```

### Fetch Trains
```
GET http://localhost:3000/api/trains?from=DEL&to=BOM&date=2026-04-20
```

### Fetch Buses
```
GET http://localhost:3000/api/buses?from=Delhi&to=Mumbai&date=2026-04-20
```

---

## 🎯 How It Works

### Frontend Flow
1. User searches for flights/hotels/trains/buses
2. Frontend calls `fetchRealFlights()`, `fetchRealHotels()`, etc.
3. These functions make HTTP requests to backend API

### Backend Flow
1. Backend receives search parameters
2. **Puppeteer launches headless browser**
3. Visits booking websites (MakeMyTrip, RedBus, etc.)
4. **Waits for dynamic content to load** (JavaScript rendered)
5. **Extracts prices and details** using CSS selectors
6. **Returns JSON** to frontend
7. Frontend renders results

---

## ⚙️ Configuration

### Change Backend Port
```bash
PORT=4000 npm start
```
Then update `realdata.js`:
```javascript
const BACKEND_URL = 'http://localhost:4000';
```

### Headless Mode (Faster)
In `server.js`, line 18-21:
```javascript
browser = await puppeteer.launch({
  headless: 'new',  // ✅ Already enabled (no browser window shown)
  args: ['--no-sandbox', '--disable-setuid-sandbox']
});
```

---

## 📊 Performance Characteristics

| Metric | Value |
|--------|-------|
| **First Search** | 15-30 seconds |
| **Subsequent Searches** | 10-15 seconds |
| **Concurrent Requests** | 1-2 (Puppeteer limitation) |
| **Results Freshness** | Real-time (always current) |
| **Browser Memory** | ~300-500 MB per page |

**Why slow?**
- Puppeteer needs to load full website (all images, scripts, styles)
- Websites load dynamically with JavaScript
- Screenshots/rendering takes time

**Optimizations:**
- Browser reused between requests
- Page cache enables faster subsequent loads
- Consider server-side caching for repeated queries

---

## 🐛 Troubleshooting

### ❌ "Backend server not available"
**Problem**: Can't connect to localhost:3000

**Solutions**:
1. Make sure `npm start` is running in terminal
2. Check if port 3000 is in use:
   ```bash
   # Windows
   netstat -ano | findstr :3000
   
   # Mac/Linux
   lsof -i :3000
   ```
3. Use different port: `PORT=4000 npm start`

### ❌ "No results found"
**Problem**: API returns empty data

**Solutions**:
1. **Website layout changed** → Update CSS selectors in `server.js`
2. **Website blocked scraping** → Use `--no-sandbox` flag (already set)
3. **Timeout too short** → Increase `setDefaultNavigationTimeout()` in server.js
4. **Check browser console** for scraping errors

### ❌ "Timeout exceeded"
**Problem**: Search takes too long or hangs

**Solutions**:
1. Check if website is very slow to load
2. Increase timeout in `server.js`:
   ```javascript
   await page.setDefaultNavigationTimeout(60000); // 60 seconds
   ```
3. Restart backend server
4. Check system memory (Puppeteer needs 500MB+)

### ❌ "Chromium failed to launch"
**Problem**: Puppeteer can't launch browser

**Solutions**:
1. Ensure Chrome/Chromium dependencies are installed:
   ```bash
   # Windows: Should work automatically
   # Mac: brew install --cask chromium
   # Linux: sudo apt-get install chromium-browser
   ```
2. Run with full sandbox disabled (use `--no-sandbox`)
3. Clear Puppeteer cache: `npm cache clean --force` then `npm install`

---

## 🔧 Development

### Edit Scraping Selectors
In `server.js`, update CSS selectors to match website structure:

```javascript
// Example: Extract flights
const airline = card.querySelector('.airline-name')?.textContent?.trim();
const depTime = card.querySelector('.dep-time')?.textContent?.trim();
// Update these if website structure changes
```

### Add More Websites
1. Create new scrape function:
   ```javascript
   async function scrapeFlightsFromGoibibo(from, to, date) {
     // Similar structure to scrapeFlights()
   }
   ```
2. Merge results in main `scrapeFlights()` function
3. Test and debug with browser inspector

### Monitor Requests
```bash
# See all API calls in console
npm start
# Look for: 📊 Scraping flights, ✅ Got 12 flights, etc.
```

---

## 📈 Production Deployment

### Heroku
```bash
# Create Procfile
echo "web: npm start" > Procfile

# Deploy
git push heroku main

# Enable browser
heroku config:set PUPPETEER_LAUNCH_ARGS="--no-sandbox --disable-setuid-sandbox"
```

### AWS Lambda
- Requires custom layer with Chromium
- Use `serverless-chrome` or AWS Lambda Layers
- Consider simpler option: EC2 instance with Node.js

### Docker
```dockerfile
FROM node:18
RUN apt-get update && apt-get install -y chromium-browser
COPY . /app
WORKDIR /app
RUN npm install
CMD ["npm", "start"]
```

---

## 📝 Monitoring

### Logs
```bash
# Watch logs while running
npm start
# Shows: ✅ Server running, 📊 Scraping..., ✅ Got X results
```

### Health Check
```bash
# Test in separate terminal
curl http://localhost:3000/health
# Response: {"status":"Server running","timestamp":"..."}
```

---

## ⚠️ Legal & Ethical Considerations

✅ **Legal to scrape:**
- Public data only
- Respects robots.txt
- Doesn't overload servers
- Follows website ToS

⚠️ **Best practices:**
- Add delays between requests
- Use appropriate User-Agent headers
- Respect rate limits (1-2 seconds per request)
- Don't scrape during peak hours

---

## 🤝 Contributing

Found a bug? Website selector outdated?

1. Update CSS selectors in `server.js`
2. Test with actual website
3. Submit PR or issue

---

## 📞 Support

**Documentation**: See comments in `server.js` and `realdata.js`
**Issues**: Check troubleshooting section above
**Community**: Star this project on GitHub!

---

**Made with ❤️ for Indian travelers**

Happy scraping! 🚀

