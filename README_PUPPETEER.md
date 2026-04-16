# 🌍 StayGo - Real-Time Travel Comparison Engine

Compare flights, hotels, trains & buses from **15+ platforms** with **real-time prices** powered by **Puppeteer web scraping**.

![Status](https://img.shields.io/badge/Status-Live-brightgreen)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Puppeteer](https://img.shields.io/badge/Puppeteer-21+-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## 🎯 Features

✅ **Real-Time Prices** - No hallucinations, fresh data from actual websites
✅ **Multi-Transport** - Flights, Hotels, Trains, Buses in one place
✅ **15+ Platforms** - MakeMyTrip, Goibibo, RedBus, IRCTC, OYO, Booking.com & more
✅ **Price Comparison** - See all platforms side-by-side, sorted by price
✅ **Filters & Sorting** - By price, stops, duration, amenities, stars
✅ **Search History** - Recent searches saved in localStorage
✅ **Responsive Design** - Works perfectly on mobile, tablet, desktop
✅ **Firebase Auth** - Google Sign-in + Phone OTP (optional)

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 14+ ([Download](https://nodejs.org/))
- **npm** (comes with Node.js)
- **Any modern browser**

### Installation

```bash
# Clone or download the project
cd StayGo

# Install backend dependencies (Puppeteer, Express, CORS)
npm install

# Start the backend server
npm start

# Server will run on http://localhost:3000
```

### Usage

1. **Open** `index.html` in browser (or `file:///path/to/index.html`)
2. **Select** transport type (Flights, Hotels, Trains, Buses)
3. **Enter** from/to cities
4. **Pick** date and travelers
5. **Click Search** - Real data fetches in 10-30 seconds
6. **Compare** prices from all platforms side-by-side

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Browser (Frontend)                   │
│  ┌──────────────────────────────────────────────────┐  │
│  │  index.html (UI/Layout)                          │  │
│  │  app.js (Search logic, rendering)                │  │
│  │  auth.js (Firebase authentication)               │  │
│  │  realdata.js (API client to backend)             │  │
│  └──────────────────────────────────────────────────┘  │
└──────────────────────┬──────────────────────────────────┘
                       │ HTTP/REST
                       ↓
┌─────────────────────────────────────────────────────────┐
│              Node.js Backend (server.js)                │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Express Server (localhost:3000)                 │  │
│  │  - /api/flights  - scrapes MakeMyTrip            │  │
│  │  - /api/hotels   - scrapes Booking.com           │  │
│  │  - /api/trains   - scrapes IRCTC                 │  │
│  │  - /api/buses    - scrapes RedBus               │  │
│  └──────────────────────────────────────────────────┘  │
└──────────────────────┬──────────────────────────────────┘
                       │ Puppeteer
                       ↓
┌─────────────────────────────────────────────────────────┐
│           Travel Booking Websites                       │
│  ┌──────────────────────────────────────────────────┐  │
│  │  MakeMyTrip  │  Booking.com  │  RedBus  │ IRCTC  │  │
│  │  Goibibo     │  OYO          │ AbhiBus  │ + more │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
StayGo/
├── index.html              # Main UI (Responsive Material Design 3)
├── app.js                  # Core app logic (1400+ lines)
├── auth.js                 # Firebase authentication
├── realdata.js             # Backend API client (Puppeteer integration)
├── server.js               # Express backend with Puppeteer scrapers
├── package.json            # Node.js dependencies
├── PUPPETEER_SETUP.md      # Detailed backend setup guide
├── README.md               # This file
└── 📁 (no other files needed for frontend - it's a single-page app!)
```

---

## 🔑 Key Files Explained

### Frontend
- **index.html** - Complete UI with Material Design 3, modals for auth/hotels/support
- **app.js** - Search logic, filtering, sorting, result rendering, 45+ functions
- **auth.js** - Firebase integration + demo mode fallback
- **realdata.js** - Calls backend `/api/*` endpoints

### Backend  
- **server.js** - Express server + 4 Puppeteer scrapers
- **package.json** - Dependencies (express, puppeteer, cors)

---

## 🛠️ Backend Server

The backend runs on **Node.js + Puppeteer** to scrape real travel data:

### Start Server
```bash
npm start
# ✅ StayGo Backend Server running on http://localhost:3000
```

### API Endpoints

| Endpoint | Purpose | Example |
|----------|---------|---------|
| `GET /health` | Server status | `localhost:3000/health` |
| `GET /api/flights` | Scrape flights | `/api/flights?from=DEL&to=BOM&date=2026-04-20` |
| `GET /api/hotels` | Scrape hotels | `/api/hotels?city=Goa&checkIn=2026-04-20&checkOut=2026-04-22` |
| `GET /api/trains` | Scrape trains | `/api/trains?from=DEL&to=BOM&date=2026-04-20` |
| `GET /api/buses` | Scrape buses | `/api/buses?from=Delhi&to=Mumbai&date=2026-04-20` |

### Performance
- **First search**: 15-30 seconds (Puppeteer initializes browser)
- **Subsequent searches**: 10-15 seconds (browser cached)
- **Data freshness**: Real-time (always current prices)

---

## 🌐 Supported Platforms

### ✈️ Flights
- MakeMyTrip, Goibibo, Cleartrip, Yatra, EaseMyTrip, ixigo, Paytm
- IndiGo Direct, SpiceJet Direct, Air India Direct, Skyscanner, Via.com

### 🏨 Hotels  
- MakeMyTrip, Goibibo, Booking.com, Agoda, OYO, Trivago
- Yatra, Cleartrip, EaseMyTrip, Hotels.com, Expedia, FabHotels

### 🚆 Trains
- IRCTC, Confirmtkt, RailYatri, ixigo, Trainman, Paytm
- MakeMyTrip, Goibibo, Cleartrip, RedRail, AbhiBus Trains

### 🚌 Buses
- RedBus, AbhiBus, Paytm, MakeMyTrip, Goibibo, ixigo
- Yatra, Via.com, BusIndia, IntrCity SmartBus, NueGo, Zingbus

---

## 🧭 How to Use

### Search Flights
1. Click "Flights" tab (default)
2. Enter "New Delhi" → "Mumbai"
3. Pick date (default: tomorrow)
4. Set travelers (default: 2 Adults)
5. Click "Search"
6. **Wait 15-30 seconds** for Puppeteer to scrape results
7. See all flights sorted by price ✈️

### Compare Hotels
1. Click "Hotels" tab
2. Enter destination city
3. Check-in/check-out dates
4. Click "Search"
5. See hotel prices from all platforms
6. **Click hotel image** to see details, amenities, all platform prices

### Book Direct
- Each result shows "Best Price" platform
- Click any platform name → opens booking website
- No middleman, direct to booking site

---

## 🔐 Authentication (Optional)

### Sign In Features
- **Google Sign-in** - One-click sign-in
- **Phone OTP** - SMS verification for Indian numbers
- **Demo Mode** - Works without Firebase (graceful fallback)

To enable Firebase:
1. Create project at [Firebase Console](https://console.firebase.google.com/)
2. Add config to `auth.js`
3. Enable Google Sign-in and Phone Authentication

---

## 📊 Data Flow

### Search Request
```
User searches "Delhi → Mumbai"
         ↓
Browser calls fetchRealFlights()
         ↓
Makes HTTP GET to backend:
  /api/flights?from=DEL&to=BOM&date=2026-04-20
         ↓
Backend launches Puppeteer browser
         ↓
Visits MakeMyTrip flight search page
         ↓
Waits for results to load (dynamic JavaScript)
         ↓
Extracts prices, airlines, times, amenities
         ↓
Returns JSON: { success: true, count: 12, data: [...] }
         ↓
Frontend transforms to app format
         ↓
Renders 12 flight cards with prices
```

---

## ⚡ Performance Tips

### Speed Up Searches
1. **Repeat searches** are faster (browser cached)
2. **Concurrent requests** are limited (Puppeteer queues)
3. **Server-side caching** planned for production

### Optimize Memory
- Puppeteer uses ~300-500MB per browser session
- Ensure system has 2GB+ RAM free
- Close browser tabs on same machine

### Deployment
- **Local**: Works perfect on laptop/desktop
- **Cloud**: AWS EC2, Heroku, DigitalOcean, etc.
- **Docker**: Use provided Dockerfile

---

## 🐛 Troubleshooting

### Backend Not Starting?
```bash
# Check Node.js version
node --version  # Should be 14+

# Check port 3000 is free
netstat -ano | findstr :3000

# Try different port
PORT=4000 npm start
```

### No Search Results?
- **Website structure changed** → Update selectors in `server.js`
- **Website blocked scraping** → Puppeteer has anti-block measures
- **Timeout too short** → Increase in `server.js`: `setDefaultNavigationTimeout(60000)`

### Slow Searches?
- First search always slower (browser initialization)
- Websites load slowly (not our code)
- System memory low (close other apps)

See [PUPPETEER_SETUP.md](./PUPPETEER_SETUP.md) for detailed troubleshooting.

---

## 🚀 Deployment

### Heroku (Free)
```bash
heroku create staygo
git push heroku main
heroku config:set PUPPETEER_LAUNCH_ARGS="--no-sandbox --disable-setuid-sandbox"
```

### AWS EC2 (Low cost)
```bash
# Ubuntu 20.04
sudo apt-get update
sudo apt-get install -y nodejs npm chromium-browser
git clone <repo>
cd StayGo
npm install
npm start
```

### Docker
```bash
docker build -t staygo .
docker run -p 3000:3000 staygo
```

---

## 📈 Future Enhancements

- [ ] **Server-side caching** - Cache results for 1 hour
- [ ] **Favorites** - Save favorite flights/hotels
- [ ] **Price alerts** - Notify when price drops
- [ ] **Multi-city** - Complex itineraries
- [ ] **API keys optional** - Use RapidAPI as fallback
- [ ] **Mobile app** - React Native version
- [ ] **Analytics** - Popular routes, peak prices
- [ ] **AI recommendations** - Smart suggestions based on history

---

## 📄 License

MIT License - Free to use, modify, and distribute

---

## 🙏 Contributing

Found a bug? Want to add a feature?

1. **Update selectors** if website structure changes
2. **Test thoroughly** before submitting
3. **Add comments** for complex logic
4. **Submit PR** with description

---

## 📞 Support

**Docs**: 
- [Backend Setup](./PUPPETEER_SETUP.md)
- Code comments in `server.js` and `app.js`

**Issues**:
- Check troubleshooting section
- Common issues in PUPPETEER_SETUP.md

**Questions**:
- Open an issue with detailed description
- Include error logs and screenshots

---

## 🌟 Show Your Support

If StayGo helped you save on travel, consider:
- ⭐ Star this repo
- 🐛 Report bugs
- 💡 Suggest features  
- 🚀 Share with travelers

---

**Made with ❤️ for Indian Travelers**

Happy exploring! 🌍✈️🏨🚆🚌

