# StayGo - Real-Time Travel Booking Comparison

Compare flights, hotels, trains & buses across India with **real-time prices** from 15+ travel platforms.

## 🎯 Quick Links

Choose your path:

### 🏃 Just Want to Deploy?
→ See **[NETLIFY_READY.md](NETLIFY_READY.md)** (5 min read)

### 🛠️ Want to Test Locally First?
→ See **[QUICK_START.md](QUICK_START.md)** (2 min setup)

### 📚 Need Full Details?
→ See **[NETLIFY_DEPLOYMENT.md](NETLIFY_DEPLOYMENT.md)** (complete guide)

### ✅ Ready to Deploy?
→ See **[NETLIFY_CHECKLIST.md](NETLIFY_CHECKLIST.md)** (step-by-step)

---

## ⚡ 5-Minute Deployment

```bash
# 1. Test locally (optional)
npm install && npm start

# 2. Push to GitHub
git push origin main

# 3. Deploy on Netlify
# → Go to https://netlify.com
# → Connect your GitHub repo
# → Click Deploy
# → Done! 🎉

# Your site: https://yoursite.netlify.app
```

---

## 🚀 Features

✅ **Real Travel Data** - Scrapes live prices from 15+ platforms
✅ **Multiple Transport Types** - Flights, Hotels, Trains, Buses
✅ **80+ Indian Cities** - Major and tier-2 cities covered
✅ **Firebase Authentication** - Google Sign-in + Phone OTP
✅ **Price Comparison** - Compare prices across platforms
✅ **Search History** - Saved searches (localStorage)
✅ **Responsive Design** - Works on desktop, tablet, mobile
✅ **No API Keys** - Just deploy and go!

---

## 🎨 Tech Stack

**Frontend**
- HTML5, CSS3, Tailwind CSS
- Vanilla JavaScript (ES6+)
- Material Design 3
- Firebase Authentication

**Backend**
- Node.js + Express.js
- Puppeteer (web scraping)
- Netlify Functions (serverless)
- CORS enabled

**Deployment**
- Netlify (free hosting)
- Netlify Functions (backend)
- GitHub (version control)

---

## 📊 Data Sources

| Platform | Type | Coverage |
|----------|------|----------|
| MakeMyTrip | Flights, Hotels, Trains | All major cities |
| Booking.com | Hotels | Worldwide |
| IRCTC | Trains | All Indian stations |
| RedBus | Buses | Major routes |
| Goibibo | Flights | Indian routes |
| OYO | Hotels | 80+ cities |
| Cleartrip | Flights | Pan-India |
| Yatra | Buses | Major routes |
| AbhiBus | Buses | Pan-India |
| Confirmtkt | Trains | All stations |

---

## 📁 Project Structure

```
StayGo/
├── index.html              # Main UI
├── app.js                  # Core app logic
├── auth.js                 # Firebase authentication
├── realdata.js             # Backend integration
├── server.js               # Local backend (for dev)
├── package.json            # Dependencies
├── netlify.toml            # Netlify config
├── .gitignore              # Git ignore rules
├── netlify/functions/      # Netlify Functions
│   ├── health.js
│   ├── flights.js
│   ├── hotels.js
│   ├── trains.js
│   ├── buses.js
│   └── puppeteer-utils.js
├── NETLIFY_READY.md        # Deployment overview
├── NETLIFY_CHECKLIST.md    # Step-by-step checklist
├── NETLIFY_DEPLOYMENT.md   # Detailed guide
├── QUICK_START.md          # Quick setup
├── PUPPETEER_SETUP.md      # Local backend guide
└── README_PUPPETEER.md     # Architecture docs
```

---

## 🚀 Getting Started

### Option 1: Deploy Immediately (Easiest)

1. Create GitHub account (free)
2. Push this code to GitHub
3. Connect repo to Netlify (free)
4. Site auto-deploys in 1-2 minutes
5. Share your URL!

→ **See [NETLIFY_READY.md](NETLIFY_READY.md)**

### Option 2: Test Locally First

1. Install Node.js (14+)
2. Run `npm install`
3. Run `npm start`
4. Open `index.html` in browser
5. Search for real travel data

→ **See [QUICK_START.md](QUICK_START.md)**

---

## 📖 Documentation

### For Deployment
- **[NETLIFY_READY.md](NETLIFY_READY.md)** - Overview & benefits
- **[NETLIFY_CHECKLIST.md](NETLIFY_CHECKLIST.md)** - Step-by-step checklist
- **[NETLIFY_DEPLOYMENT.md](NETLIFY_DEPLOYMENT.md)** - Complete guide

### For Development
- **[QUICK_START.md](QUICK_START.md)** - Quick local setup
- **[PUPPETEER_SETUP.md](PUPPETEER_SETUP.md)** - Local backend details
- **[README_PUPPETEER.md](README_PUPPETEER.md)** - Architecture overview

---

## ⚙️ How It Works

```
┌─────────────────────┐
│  Your Browser       │
│  (index.html)       │
└──────────┬──────────┘
           │ Search for flights
           ↓
┌─────────────────────┐
│  Netlify Functions  │
│  (Backend)          │
│  - flights.js       │
│  - hotels.js        │
│  - trains.js        │
│  - buses.js         │
└──────────┬──────────┘
           │ Opens headless browser
           ↓
┌─────────────────────┐
│ Travel Websites     │
│ - MakeMyTrip        │
│ - Booking.com       │
│ - IRCTC             │
│ - RedBus            │
│ etc...              │
└─────────────────────┘
           ↓ Extracts data
           ↓
┌─────────────────────┐
│ Returns JSON        │
│ with real prices    │
└─────────────────────┘
```

**Result:** Real travel data, no hallucinations, always current! ✅

---

## 🎯 Key Features

### Real-Time Data
- Scrapes live prices from 15+ platforms
- Updates on every search
- Never shows cached/outdated data

### No API Keys Required
- Just deploy and go
- No RapidAPI, no API key management
- Self-hosted Puppeteer backend

### Search Multiple Categories
- ✈️ Flights
- 🏨 Hotels
- 🚆 Trains
- 🚌 Buses

### Smart Features
- 💾 Search history (localStorage)
- 🔍 Price comparison across platforms
- 🎨 Dark mode support
- 📱 Mobile responsive
- 🔐 Firebase authentication

---

## 💾 Local vs Netlify

| Aspect | Local (`npm start`) | Netlify (Cloud) |
|--------|------------------|-----------------|
| **Setup** | 2 minutes | 5 minutes |
| **Cost** | Free | Free |
| **Runs On** | Your PC | Netlify servers |
| **Share URL** | No | Yes ✅ |
| **Always On** | Yes | On-demand |
| **Performance** | Faster | Medium |
| **Dependencies** | Node.js 14+ | None |

---

## ⏱️ Performance Notes

**Netlify Functions (Cloud)**
- First search: 15-30 seconds (browser startup)
- Subsequent searches: 10-15 seconds
- First search may timeout on Netlify free tier (retry and it works)
- Upgrade to Netlify Pro for unlimited timeout

**Local Development**
- First search: 15-30 seconds
- Subsequent searches: 10-15 seconds
- No timeout issues

---

## 🔐 Authentication

### Firebase Integration
- Google Sign-in with one click
- Phone OTP verification
- Demo mode (works without Firebase setup)
- User data stored locally

### No Configuration Needed
- Firebase keys already configured
- Demo fallback if Firebase unavailable
- Works right out of the box

---

## 🌐 Supported Cities

### Major Cities (80+)
Delhi, Mumbai, Bangalore, Hyderabad, Chennai, Kolkata, Pune, Ahmedabad, Jaipur, Chandigarh, Lucknow, Indore, Coimbatore, Kochi, Visakhapatnam, Goa, Guwahati, Udaipur, Jodhpur, Shimla, Manali, Ooty, Mussoorie, and 50+ more...

### Coverage
- Pan-India flights, hotels, trains, buses
- Real prices from major platforms
- Updated on every search

---

## 📞 Support & Issues

### Common Issues
- **"Functions timing out"** → Normal on first search, retry works
- **"No real data showing"** → Check health endpoint: `/.netlify/functions/health`
- **"Build failed"** → Check `netlify.toml` exists and `netlify/functions/` folder

### Resources
- **Netlify Docs:** https://docs.netlify.com
- **Puppeteer Docs:** https://pptr.dev/
- **Express Docs:** https://expressjs.com/

---

## 🚀 Deployment Checklist

- [ ] Test locally: `npm start`
- [ ] Create GitHub account
- [ ] Push code to GitHub
- [ ] Create Netlify account
- [ ] Connect GitHub repo to Netlify
- [ ] Deploy
- [ ] Test deployed site
- [ ] Share URL with others

**Total time: 10-15 minutes** ⚡

---

## 🎉 What You Get

After deploying to Netlify:

✅ **Live URL** - `https://yoursite.netlify.app`
✅ **Real Travel Data** - From 15+ platforms
✅ **Zero Maintenance** - Auto-scales on Netlify
✅ **Shareable** - Send URL to anyone
✅ **Free Forever** - Netlify free tier
✅ **Always Updated** - Live prices on every search
✅ **No Backend Setup** - Netlify handles it all

---

## 📈 Next Steps

1. **Right Now:** Read [NETLIFY_READY.md](NETLIFY_READY.md) (5 min)
2. **Soon:** Deploy to Netlify using [NETLIFY_CHECKLIST.md](NETLIFY_CHECKLIST.md) (10 min)
3. **Then:** Share your live URL! 🎉

---

## 📝 License

This project is free to use, modify, and deploy!

---

## 🙏 Credits

Built with:
- Puppeteer (web scraping)
- Express.js (backend)
- Firebase (authentication)
- Netlify (hosting)
- Material Design 3 (UI)

---

**Happy Traveling! 🚀**

Deploy now and let people search real flights, hotels, trains & buses!

→ **Start here: [NETLIFY_READY.md](NETLIFY_READY.md)**
