# 🚀 StayGo Deployment Guide - Netlify

## Overview
StayGo can be deployed to Netlify using Netlify Functions for the backend. This guide walks through both local development and cloud deployment.

## Architecture

### Local Development
```
Your Computer
├── Frontend (index.html)
├── Backend (server.js) → runs on localhost:3000
└── Puppeteer (automatic browser)
```

### Netlify Deployment
```
Netlify Cloud
├── Frontend (static files)
├── Netlify Functions (backend)
│   ├── /api/flights
│   ├── /api/hotels
│   ├── /api/trains
│   └── /api/buses
└── Puppeteer (runs in functions)
```

## Option 1: Local Development (Recommended First)

### Prerequisites
- Node.js 14+ ([download](https://nodejs.org/))
- Terminal/Command Prompt

### Setup Steps

1. **Install dependencies**
```bash
cd StayGo
npm install
```

2. **Start backend server**
```bash
npm start
```

Expected output:
```
✅ StayGo Backend Server running on http://localhost:3000
✅ Browser initialized
✅ Ready to scrape travel data
```

3. **Open frontend**
- Open `index.html` in your browser
- Or use: `npx http-server .` in another terminal

4. **Test a search**
- Search for flights, hotels, trains, or buses
- Real data will be fetched from travel websites

**Performance:**
- First search: 15-30 seconds (browser initialization)
- Subsequent searches: 10-15 seconds

---

## Option 2: Deploy to Netlify (Free Hosting)

### Prerequisites
- GitHub account ([create one](https://github.com/join))
- Netlify account ([create one](https://netlify.com/signup))

### Step-by-Step Deployment

#### 1. Create GitHub Repository

```bash
# Initialize git in your StayGo folder
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: StayGo with Puppeteer backend"

# Create repo on GitHub, then push
git remote add origin https://github.com/YOUR_USERNAME/staygo.git
git branch -M main
git push -u origin main
```

#### 2. Connect to Netlify

1. Go to **https://app.netlify.com**
2. Click **"New site from Git"**
3. Click **"GitHub"**
4. Authorize Netlify to access your GitHub account
5. Search and select **`staygo`** repository
6. Netlify will auto-detect settings (should see: `netlify.toml`)
7. Click **"Deploy site"**

**Wait 1-2 minutes for deployment...**

#### 3. Verify Deployment

Once deployed, you'll get a URL like: `https://determined-fish-abc123.netlify.app`

Test the backend functions:
```
https://determined-fish-abc123.netlify.app/.netlify/functions/health
```

Should return:
```json
{
  "success": true,
  "message": "✅ StayGo Backend Running on Netlify",
  "platform": "Netlify Functions"
}
```

#### 4. Search with Real Data

1. Go to your Netlify URL
2. Search for flights/hotels/trains/buses
3. Real data is automatically fetched!

---

## Configuration Files

### `netlify.toml` (Deployment Configuration)

```toml
[build]
  command = "npm install puppeteer"
  publish = "."
  functions = "netlify/functions"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200
```

This configuration:
- Installs Puppeteer during build
- Serves static files from root
- Maps `/api/*` requests to Netlify Functions

### `netlify/functions/` (Backend Functions)

Each function is a serverless endpoint:
- `health.js` - Health check
- `flights.js` - Flight scraping
- `hotels.js` - Hotel scraping
- `trains.js` - Train scraping
- `buses.js` - Bus scraping

---

## How the Frontend Detects Backend

**File: `realdata.js`**

```javascript
const BACKEND_URL = typeof window !== 'undefined' && window.location.hostname === 'localhost'
  ? 'http://localhost:3000'
  : ''; // Empty = use Netlify Functions

// Auto-routes to correct backend:
// Local: http://localhost:3000/api/flights
// Netlify: /.netlify/functions/flights
```

---

## Troubleshooting

### Functions Timing Out

**Problem:** "Function execution exceeded timeout"

**Solution:**
- Netlify has 26-30 second timeout on free tier
- First scrape always takes 15-30 seconds
- This is normal - try again, subsequent requests are faster
- For production, upgrade to Netlify Pro (unlimited timeout)

### Puppeteer Not Found

**Problem:** "Cannot find module 'puppeteer'"

**Solution:**
- Make sure Netlify build ran successfully
- Check build logs in Netlify dashboard
- Puppeteer download may take 2-3 minutes

### 404 on API Endpoints

**Problem:** "Not found" when calling `/api/flights`

**Solution:**
- Verify netlify.toml has redirect rules
- Check `netlify/functions/` folder exists
- Redeploy: Push to GitHub → Netlify auto-deploys

### Real Data Not Loading

**Problem:** Setup page still shows on Netlify URL

**Solution:**
- Open browser console (F12)
- Check for errors
- Verify health check returns 200: `/.netlify/functions/health`
- Refresh page (F5)

---

## Data Sources

StayGo scrapes from these real platforms:

| Platform | Category | Scraped Data |
|----------|----------|--------------|
| MakeMyTrip | Flights, Hotels, Trains | Price, Time, Duration |
| Booking.com | Hotels | Rating, Price, Amenities |
| IRCTC | Trains | Classes, Availability |
| RedBus | Buses | Operator, Duration, Price |
| Goibibo | Flights | Airlines, Price |
| OYO | Hotels | Price, Rating |
| And 10+ more... | Mixed | Real-time prices |

---

## Local vs Netlify Performance

| Aspect | Local | Netlify |
|--------|-------|---------|
| Setup Time | 2 minutes | 5 minutes |
| First Search | 15-30s | 15-30s |
| Next Searches | 10-15s | 10-15s |
| Cost | Free | Free (paid for Pro) |
| Browser | Your PC | Netlify Servers |
| Always Running | Yes | On-demand |

---

## Advanced: Custom Domain

1. In Netlify dashboard, go to **Site Settings**
2. Click **Domain Management**
3. Add your custom domain
4. Update DNS records (or use Netlify DNS)
5. Domain will be live in 24 hours

Example: `https://staygo.yourdomain.com`

---

## Environment Variables

For production, set these in Netlify dashboard:

**Settings → Build & Deploy → Environment**

```
PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=false
NODE_ENV=production
```

---

## Monitoring & Logs

### Check Deployment Status
1. Go to Netlify dashboard
2. Click your site
3. See deployment history
4. Click latest deployment
5. View build logs

### Check Function Logs
1. In Netlify dashboard
2. Go to **Functions**
3. Click function name
4. View recent invocations and errors

---

## Next Steps

1. ✅ Test locally first (`npm start`)
2. ✅ Push to GitHub
3. ✅ Deploy to Netlify
4. ✅ Share your URL
5. ✅ Monitor in Netlify dashboard

---

## Support

- **Local Issues?** Check [PUPPETEER_SETUP.md](../PUPPETEER_SETUP.md)
- **Netlify Issues?** See [Netlify Docs](https://docs.netlify.com/)
- **Puppeteer Issues?** See [Puppeteer Docs](https://pptr.dev/)

---

## Summary

You now have **3 deployment options**:

1. **Local Only** - `npm start` for personal use
2. **GitHub + Netlify** - Free cloud deployment
3. **Custom Backend** - Deploy server separately (Render, Railway, etc.)

Pick option 2 (Netlify) for the easiest full-stack deployment! 🎉
