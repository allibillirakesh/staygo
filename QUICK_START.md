# 🚀 StayGo Quick Start - Puppeteer Backend

## What Changed
We've completely switched from RapidAPI to a **self-hosted Puppeteer backend** that scrapes real travel websites directly. No API keys needed!

## Deployment Options

### Option A: Local Development (Fastest)
Run backend on your computer for testing.

### Option B: Netlify Cloud (Recommended)
Deploy everything to Netlify with serverless functions (FREE & LIVE on the internet).

---

## Option A: Quick Setup - Local (2 minutes)

### Step 1: Install Node.js
- Download from **https://nodejs.org** (v14 or higher)
- Verify: Open terminal and run `node --version`

### Step 2: Install Dependencies
```bash
npm install
```
This installs Express, Puppeteer, and CORS.

### Step 3: Start Backend Server
```bash
npm start
```
You should see:
```
✅ StayGo Backend Server running on http://localhost:3000
✅ Browser initialized
✅ Ready to scrape travel data
```

### Step 4: Reload the Website
- Go back to your browser (index.html)
- Press **F5** to reload
- The setup page will auto-detect the backend and disappear
- **Start searching!** 🎉

---

## Option B: Netlify Deployment (5 minutes - LIVE on Internet!)

Deploy to Netlify for FREE and get a live URL anyone can access!

### Prerequisites
- GitHub account (free)
- Netlify account (free)

### Steps

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "StayGo: Ready for Netlify"
git remote add origin https://github.com/YOUR_USERNAME/staygo.git
git push -u origin main
```

2. **Connect to Netlify**
- Go to **https://netlify.com**
- Click "New site from Git"
- Select your GitHub repo
- Netlify auto-detects `netlify.toml` (already configured!)
- Click "Deploy"

3. **Done!** 🎉
- Your site is live at: `https://your-site-name.netlify.app`
- Share the URL with anyone!
- Functions auto-handle backend scraping

### How It Works on Netlify

```
┌──────────────────────────────────┐
│   Netlify (Your Live Site)       │
├──────────────────────────────────┤
│ Frontend: HTML/CSS/JavaScript    │
│ Backend: Netlify Functions       │
│  ├─ /api/flights                 │
│  ├─ /api/hotels                  │
│  ├─ /api/trains                  │
│  └─ /api/buses                   │
│ Each function uses Puppeteer     │
└──────────────────────────────────┘
```

---

## How It Works

### Local Development (Option A)
1. **Frontend** (index.html) sends search requests to your local backend
2. **Backend** (server.js on localhost:3000) uses Puppeteer
3. **Puppeteer** navigates real travel websites
4. **Backend** extracts and returns real data
5. **Response** goes to frontend - NO HALLUCINATIONS ✅

### Netlify Deployment (Option B)
Same flow, but backend runs on Netlify Functions instead of localhost!

## Architecture

```
┌─────────────────────────┐
│   Your Browser          │
│   (index.html)          │
│   User searches flights │
└──────────┬──────────────┘
           │ HTTP POST /api/flights
           ↓
┌─────────────────────────┐
│   Backend Server        │
│   (localhost:3000)      │
│   - Express.js          │
│   - Puppeteer           │
└──────────┬──────────────┘
           │ Opens headless browser
           ↓
┌─────────────────────────┐
│   Real Travel Sites     │
│   - MakeMyTrip          │
│   - Booking.com         │
│   - IRCTC               │
│   - RedBus              │
│   etc...                │
└─────────────────────────┘
```

## Performance

- **First search**: 15-30 seconds (browser initialization)
- **Subsequent searches**: 10-15 seconds (browser reused)
- **Data freshness**: Always current prices from real websites

## Troubleshooting

### Backend not starting
```bash
# Check if port 3000 is available
# Try: npm start -- --port 3001
```

### Puppeteer download fails
```bash
# Manually install Puppeteer
npm install puppeteer --no-save
npm start
```

### Setup page still showing after `npm start`
1. Check terminal - does it say "✅ running on http://localhost:3000"?
2. Refresh browser (F5)
3. Check browser console (F12) for errors

### Website selectors broken
If scraping returns no results:
1. Check PUPPETEER_SETUP.md for CSS selector updates
2. Website layouts may have changed
3. Update selectors in server.js

## What Gets Scraped

| Service | Category | Data Points |
|---------|----------|------------|
| MakeMyTrip | Flights, Hotels, Trains | Price, Time, Duration, Stops |
| Booking.com | Hotels | Rating, Price, Location, Amenities |
| IRCTC | Trains | Classes, Price, Availability |
| RedBus | Buses | Type, Duration, Price, Operator |
| Goibibo | Flights | Airlines, Price, Duration |
| OYO | Hotels | Price, Rating, Amenities |
| Cleartrip | Flights | Price, Airlines, Duration |
| Yatra | Buses | Operator, Price, Duration |
| ... and more! | Mix | Real-time prices |

## Stop Backend
```bash
Press Ctrl+C in the terminal
```

## Advanced: Run on Different Port
```bash
PORT=3001 npm start
# Then update BACKEND_URL in realdata.js
```

## Get Help

- **Setup Issues**: See [PUPPETEER_SETUP.md](PUPPETEER_SETUP.md)
- **Architecture**: See [README_PUPPETEER.md](README_PUPPETEER.md)
- **Detailed Guide**: See [PUPPETEER_SETUP.md](PUPPETEER_SETUP.md) → Troubleshooting

## Next Steps

✅ Install Node.js  
✅ Run `npm install`  
✅ Run `npm start`  
✅ Reload browser  
✅ Search flights/hotels/trains/buses  
✅ **Enjoy real-time travel data!** 🎉

---

**Questions?** Check the console (F12) for error messages. Backend logs appear in terminal.
