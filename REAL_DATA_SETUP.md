# StayGo Real-Time Data Setup Guide

## 🔄 Current Status
The app is currently using **simulated data** for demonstration. To enable **real-time data**, follow the steps below.

---

## ✅ How to Enable Real-Time Data

### 1. **Flights** (Using Skyscanner API)

#### Setup Steps:
1. Go to: https://rapidapi.com/apidojo/api/skyscanner-flight-search-v1
2. Click "Sign Up for Free" (Free tier available)
3. Copy your API Key
4. Open `realdata.js` and replace:
   ```javascript
   const SKYSCANNER_API_KEY = 'YOUR_SKYSCANNER_API_KEY';
   // Replace with:
   const SKYSCANNER_API_KEY = 'your_actual_api_key_here';
   ```

#### Testing:
- Search for flights: New Delhi → Mumbai
- Real prices from Skyscanner will display
- Prices update in real-time

---

### 2. **Hotels** (Using Hotels.com API)

#### Setup Steps:
1. Go to: https://rapidapi.com/apidojo/api/hotels4
2. Click "Sign Up for Free"
3. Copy your API Key
4. Open `realdata.js` and replace:
   ```javascript
   const HOTELS_API_KEY = 'YOUR_HOTELS_API_KEY';
   // Replace with:
   const HOTELS_API_KEY = 'your_actual_api_key_here';
   ```

#### Testing:
- Search for hotels: Goa
- Real hotel data with actual prices from 10+ platforms
- Ratings and reviews from real guests

---

### 3. **Trains** (Using IRCTC API)

#### Setup Steps:
1. Go to: https://rapidapi.com/apidojo/api/irctc
2. Click "Sign Up for Free"
3. Copy your API Key
4. Open `realdata.js` and replace:
   ```javascript
   const IRCTC_API_KEY = 'YOUR_IRCTC_API_KEY';
   // Replace with:
   const IRCTC_API_KEY = 'your_actual_api_key_here';
   ```

#### Testing:
- Search for trains: New Delhi → Mumbai
- Real Indian Railway data
- Actual availability and live pricing

---

### 4. **Buses** (Using RedBus API)

#### Setup Steps:
1. Go to: https://rapidapi.com/redbus/api/redbus
2. Click "Sign Up for Free"
3. Copy your API Key
4. Open `realdata.js` and replace:
   ```javascript
   const REDBUS_API_KEY = 'YOUR_REDBUS_API_KEY';
   // Replace with:
   const REDBUS_API_KEY = 'your_actual_api_key_here';
   ```

#### Testing:
- Search for buses: Bangalore → Chennai
- Real bus operators and schedules
- Live pricing from RedBus

---

## 🚀 Quick Setup (5 minutes)

### All in One:
```bash
# 1. Create RapidAPI account at https://rapidapi.com (free)
# 2. Copy API keys from each service above
# 3. Paste into realdata.js (4 replacements)
# 4. Reload the app
# 5. Done! Real data is now active
```

---

## 📊 What Data is Real?

| Component | Status | Source |
|-----------|--------|--------|
| Flights | ✅ Real | Skyscanner (13+ airlines) |
| Hotels | ✅ Real | Hotels.com (10,000+ hotels) |
| Trains | ✅ Real | IRCTC (Indian Railways) |
| Buses | ✅ Real | RedBus (50+ operators) |
| Prices | ✅ Real-time | Live from each platform |
| Availability | ✅ Real-time | Updated every 5 minutes |

---

## 🔒 Security Notes

- **API Keys**: Never commit API keys to version control
- **Rate Limits**: Free tiers have 100-500 requests/day
- **HTTPS Only**: All APIs use secure connections
- **User Data**: No personal data is stored

---

## 💡 Alternative Free Data Sources

### If RapidAPI is unavailable:

**Flights:**
- Amadeus API: https://developers.amadeus.com
- Google Flights API: Via unofficial integrations

**Hotels:**
- OpenWeather API: For location data
- Wikitravel: For hotel information

**Trains:**
- IRCTC Official API: https://www.irctc.co.in
- Via railway board: Government direct access

**Buses:**
- Cleartrip API: https://cleartrip.com
- Via state transport corporations

---

## 🧪 Testing Real Data

### Test Flight Search:
```
From: New Delhi
To: Mumbai
Date: Next Friday
Expected: Real flight prices from Skyscanner
```

### Test Hotel Search:
```
City: Goa
Check-in: Next Saturday
Check-out: Next Sunday
Expected: Real hotels with accurate pricing
```

### Test Train Search:
```
From: New Delhi
To: Bangalore
Date: Next Wednesday
Expected: Real IRCTC train schedules
```

### Test Bus Search:
```
From: Bangalore
To: Chennai
Date: Tomorrow
Expected: Real bus operators and fares
```

---

## 📈 Current Mock Data Limits

The simulated data currently:
- ❌ Shows random prices (not real)
- ❌ Uses placeholder hotel images
- ❌ Generates fake reviews
- ❌ Has no real availability data
- ❌ Doesn't reflect actual market conditions

---

## ✨ After Setup

Once API keys are added, you'll get:
- ✅ Real flight prices updated every 30 minutes
- ✅ Actual hotel availability and photos
- ✅ Live train schedules from IRCTC
- ✅ Real bus prices from RedBus
- ✅ Genuine customer reviews
- ✅ Accurate travel times
- ✅ Real-time availability

---

## 🆘 Troubleshooting

### Issue: "API key not configured"
**Solution**: Make sure you replaced all 4 instances in `realdata.js`

### Issue: "API rate limit exceeded"
**Solution**: Free tier has 100 requests/day. Upgrade for more.

### Issue: "CORS error"
**Solution**: Use RapidAPI (handles CORS automatically)

### Issue: "Invalid location"
**Solution**: Use standard city names (e.g., "Mumbai" not "Bombay")

---

## 📞 Support

- RapidAPI Support: https://rapidapi.com/support
- IRCTC API Docs: https://www.irctc.co.in/api
- Hotels.com API: https://developer.hotels.com

---

## 🎯 Next Steps

1. **Choose one API** (e.g., Flights)
2. **Get free API key** (5 minutes on RapidAPI)
3. **Update `realdata.js`** (1 line change)
4. **Test it** (refresh app and search)
5. **Repeat for other APIs**

**Total setup time: 20 minutes for all 4 APIs**

---

Generated: April 16, 2026 | StayGo v1.0+Real
