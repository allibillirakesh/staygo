// ============================
// StayGo — Travel Price Comparison Engine
// All data is simulated for demonstration
// ============================

// ==================== CITY DATA ====================
const INDIAN_CITIES = [
  { name: "New Delhi", code: "DEL", state: "Delhi" },
  { name: "Mumbai", code: "BOM", state: "Maharashtra" },
  { name: "Bengaluru", code: "BLR", state: "Karnataka", aliases: ["Bangalore"] },
  { name: "Chennai", code: "MAA", state: "Tamil Nadu", aliases: ["Madras"] },
  { name: "Kolkata", code: "CCU", state: "West Bengal", aliases: ["Calcutta"] },
  { name: "Hyderabad", code: "HYD", state: "Telangana" },
  { name: "Pune", code: "PNQ", state: "Maharashtra" },
  { name: "Ahmedabad", code: "AMD", state: "Gujarat" },
  { name: "Jaipur", code: "JAI", state: "Rajasthan" },
  { name: "Goa", code: "GOI", state: "Goa", aliases: ["Panaji", "Calangute", "Baga"] },
  { name: "Lucknow", code: "LKO", state: "Uttar Pradesh" },
  { name: "Kochi", code: "COK", state: "Kerala", aliases: ["Cochin"] },
  { name: "Chandigarh", code: "IXC", state: "Punjab" },
  { name: "Varanasi", code: "VNS", state: "Uttar Pradesh", aliases: ["Banaras", "Kashi"] },
  { name: "Udaipur", code: "UDR", state: "Rajasthan" },
  { name: "Amritsar", code: "ATQ", state: "Punjab" },
  { name: "Indore", code: "IDR", state: "Madhya Pradesh" },
  { name: "Bhopal", code: "BHO", state: "Madhya Pradesh" },
  { name: "Patna", code: "PAT", state: "Bihar" },
  { name: "Srinagar", code: "SXR", state: "J&K" },
  { name: "Thiruvananthapuram", code: "TRV", state: "Kerala", aliases: ["Trivandrum"] },
  { name: "Coimbatore", code: "CJB", state: "Tamil Nadu" },
  { name: "Nagpur", code: "NAG", state: "Maharashtra" },
  { name: "Visakhapatnam", code: "VTZ", state: "Andhra Pradesh", aliases: ["Vizag"] },
  { name: "Mysuru", code: "MYQ", state: "Karnataka", aliases: ["Mysore"] },
  // Tourist & hill station destinations
  { name: "Coorg", code: "COG", state: "Karnataka", aliases: ["Kodagu", "Madikeri"] },
  { name: "Manali", code: "MNL", state: "Himachal Pradesh" },
  { name: "Shimla", code: "SML", state: "Himachal Pradesh" },
  { name: "Ooty", code: "OOT", state: "Tamil Nadu", aliases: ["Udhagamandalam", "Nilgiris"] },
  { name: "Rishikesh", code: "RSK", state: "Uttarakhand" },
  { name: "Dehradun", code: "DED", state: "Uttarakhand" },
  { name: "Darjeeling", code: "DRJ", state: "West Bengal" },
  { name: "Munnar", code: "MNR", state: "Kerala" },
  { name: "Alleppey", code: "ALP", state: "Kerala", aliases: ["Alappuzha"] },
  { name: "Agra", code: "AGR", state: "Uttar Pradesh" },
  { name: "Jodhpur", code: "JDH", state: "Rajasthan" },
  { name: "Jaisalmer", code: "JSM", state: "Rajasthan" },
  { name: "Gangtok", code: "GTK", state: "Sikkim" },
  { name: "Leh", code: "IXL", state: "Ladakh", aliases: ["Ladakh"] },
  { name: "Pondicherry", code: "PNY", state: "Puducherry", aliases: ["Puducherry"] },
  { name: "Andaman", code: "IXZ", state: "Andaman & Nicobar", aliases: ["Port Blair"] },
  { name: "Madurai", code: "IXM", state: "Tamil Nadu" },
  { name: "Tirupati", code: "TIR", state: "Andhra Pradesh" },
  { name: "Haridwar", code: "HRW", state: "Uttarakhand" },
  { name: "Nainital", code: "NNT", state: "Uttarakhand" },
  { name: "Mussoorie", code: "MSR", state: "Uttarakhand" },
  { name: "Lonavala", code: "LNV", state: "Maharashtra", aliases: ["Khandala"] },
  { name: "Mahabaleshwar", code: "MHB", state: "Maharashtra" },
  { name: "Mount Abu", code: "MAB", state: "Rajasthan" },
  { name: "Kodaikanal", code: "KDK", state: "Tamil Nadu" },
  { name: "Wayanad", code: "WYD", state: "Kerala" },
  { name: "Hampi", code: "HMP", state: "Karnataka" },
  { name: "Guwahati", code: "GAU", state: "Assam" },
  { name: "Shillong", code: "SHL", state: "Meghalaya" },
  { name: "Bhubaneswar", code: "BBI", state: "Odisha" },
  { name: "Puri", code: "PUR", state: "Odisha" },
  { name: "Ranchi", code: "IXR", state: "Jharkhand" },
  { name: "Raipur", code: "RPR", state: "Chhattisgarh" },
  { name: "Vijayawada", code: "VGA", state: "Andhra Pradesh" },
  { name: "Mangaluru", code: "IXE", state: "Karnataka", aliases: ["Mangalore"] },
  { name: "Hubli", code: "HBX", state: "Karnataka" },
  { name: "Surat", code: "STV", state: "Gujarat" },
  { name: "Rajkot", code: "RAJ", state: "Gujarat" },
  { name: "Vadodara", code: "BDQ", state: "Gujarat", aliases: ["Baroda"] },
  { name: "Aurangabad", code: "IXU", state: "Maharashtra" },
  { name: "Kolhapur", code: "KLH", state: "Maharashtra" },
  { name: "Nashik", code: "ISK", state: "Maharashtra" },
  { name: "Shirdi", code: "SAG", state: "Maharashtra" },
  { name: "Khajuraho", code: "HJR", state: "Madhya Pradesh" },
  { name: "Dharamshala", code: "DHM", state: "Himachal Pradesh", aliases: ["McLeodganj"] },
  { name: "Kasol", code: "KSL", state: "Himachal Pradesh" },
  { name: "Dalhousie", code: "DLH", state: "Himachal Pradesh" },
  { name: "Auli", code: "AUL", state: "Uttarakhand" },
  { name: "Lansdowne", code: "LSD", state: "Uttarakhand" },
  { name: "Jim Corbett", code: "JCB", state: "Uttarakhand", aliases: ["Corbett", "Ramnagar"] },
  { name: "Chikmagalur", code: "CKM", state: "Karnataka" },
  { name: "Gokarna", code: "GKN", state: "Karnataka" },
  { name: "Kovalam", code: "KVM", state: "Kerala" },
  { name: "Varkala", code: "VRK", state: "Kerala" },
  { name: "Thekkady", code: "TKD", state: "Kerala" },
  { name: "Pushkar", code: "PSK", state: "Rajasthan" },
  { name: "Ranthambore", code: "RTB", state: "Rajasthan" },
  { name: "Bikaner", code: "BKN", state: "Rajasthan" },
  { name: "Ajmer", code: "AJM", state: "Rajasthan" },
];

// ==================== PLATFORM DATA ====================
const PLATFORMS = {
  flights: ["MakeMyTrip", "Goibibo", "Cleartrip", "Yatra", "EaseMyTrip", "ixigo", "Paytm", "IndiGo Direct", "SpiceJet Direct", "Air India Direct", "Skyscanner", "Via.com", "HappyFares"],
  hotels: ["MakeMyTrip", "Goibibo", "Booking.com", "Agoda", "OYO", "Trivago", "Yatra", "Cleartrip", "EaseMyTrip", "Hotels.com", "Expedia", "FabHotels", "Treebo"],
  trains: ["IRCTC", "Confirmtkt", "RailYatri", "ixigo", "Trainman", "Paytm", "MakeMyTrip", "Goibibo", "Cleartrip", "RedRail", "AbhiBus Trains"],
  buses: ["RedBus", "AbhiBus", "Paytm", "MakeMyTrip", "Goibibo", "ixigo", "Yatra", "Via.com", "BusIndia", "IntrCity SmartBus", "NueGo", "Zingbus"],
};

// Real booking URLs for each platform
const PLATFORM_URLS = {
  "MakeMyTrip": "https://www.makemytrip.com",
  "Goibibo": "https://www.goibibo.com",
  "Cleartrip": "https://www.cleartrip.com",
  "Yatra": "https://www.yatra.com",
  "EaseMyTrip": "https://www.easemytrip.com",
  "ixigo": "https://www.ixigo.com",
  "Paytm": "https://tickets.paytm.com",
  "IndiGo Direct": "https://www.goindigo.in",
  "SpiceJet Direct": "https://www.spicejet.com",
  "Air India Direct": "https://www.airindia.com",
  "Skyscanner": "https://www.skyscanner.co.in",
  "Via.com": "https://www.via.com",
  "HappyFares": "https://www.happyfares.in",
  "Booking.com": "https://www.booking.com",
  "Agoda": "https://www.agoda.com",
  "OYO": "https://www.oyorooms.com",
  "Trivago": "https://www.trivago.in",
  "Hotels.com": "https://in.hotels.com",
  "Expedia": "https://www.expedia.co.in",
  "FabHotels": "https://www.fabhotels.com",
  "Treebo": "https://www.treebo.com",
  "IRCTC": "https://www.irctc.co.in",
  "Confirmtkt": "https://www.confirmtkt.com",
  "RailYatri": "https://www.railyatri.in",
  "Trainman": "https://www.trainman.in",
  "RedRail": "https://www.redrail.in",
  "AbhiBus Trains": "https://www.abhibus.com",
  "RedBus": "https://www.redbus.in",
  "AbhiBus": "https://www.abhibus.com",
  "BusIndia": "https://www.busindia.com",
  "IntrCity SmartBus": "https://www.intrcity.com",
  "NueGo": "https://www.nuego.in",
  "Zingbus": "https://www.zingbus.com",
};

function getBookingUrl(platform, type, from, to) {
  const base = PLATFORM_URLS[platform] || "https://www.google.com/search?q=" + encodeURIComponent(platform + " " + type);
  // Build search-specific URLs for popular platforms
  const fromEnc = encodeURIComponent(from || "");
  const toEnc = encodeURIComponent(to || "");
  switch (platform) {
    case "MakeMyTrip":
      if (type === "hotels") return `https://www.makemytrip.com/hotels/hotel-listing/?city=${toEnc}`;
      if (type === "flights") return `https://www.makemytrip.com/flight/search?from=${fromEnc}&to=${toEnc}`;
      if (type === "trains") return `https://www.makemytrip.com/railways/`;
      if (type === "buses") return `https://www.makemytrip.com/bus-tickets/`;
      break;
    case "Goibibo":
      if (type === "hotels") return `https://www.goibibo.com/hotels/hotels-in-${toEnc.toLowerCase()}/`;
      if (type === "flights") return `https://www.goibibo.com/flights/`;
      break;
    case "RedBus":
      return `https://www.redbus.in/bus-tickets/${fromEnc.toLowerCase()}-to-${toEnc.toLowerCase()}`;
    case "IRCTC":
      return "https://www.irctc.co.in/nget/train-search";
    case "Booking.com":
      return `https://www.booking.com/searchresults.html?ss=${toEnc}`;
    case "OYO":
      return `https://www.oyorooms.com/search?location=${toEnc}`;
    case "Skyscanner":
      return `https://www.skyscanner.co.in/transport/flights/${fromEnc}/${toEnc}/`;
    default:
      return base;
  }
  return base;
}

function openDeal(platform, type) {
  const url = getBookingUrl(platform, type, searchFrom, searchTo);
  window.open(url, '_blank');
}

const AIRLINES = ["IndiGo", "Air India", "SpiceJet", "Vistara", "Akasa Air", "Air India Express", "Go First"];
const TRAIN_TYPES = ["Rajdhani Express", "Shatabdi Express", "Duronto Express", "Humsafar Express", "Garib Rath", "Superfast Express", "Jan Shatabdi", "Tejas Express"];
const BUS_OPERATORS = ["VRL Travels", "SRS Travels", "Neeta Travels", "Paulo Travels", "Orange Travels", "KPN Travels", "Kallada Travels", "KSRTC", "MSRTC", "UPSRTC", "IntrCity SmartBus", "NueGo", "Zingbus"];
const HOTEL_CHAINS = ["Taj Hotels", "The Oberoi", "ITC Hotels", "The Leela Palace", "Radisson", "Marriott", "Hyatt", "OYO Townhouse", "FabHotel Prime", "Treebo Trend", "Lemon Tree", "Hotel Sarovar", "Holiday Inn", "Novotel", "ibis"];

const HOTEL_IMAGES = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuByfe5cRPnP9d1UCi4u-Iaql9obmeYNSbuQZ4A57qVMkXVJF6kdy3nBAUof06R-HhxhOvI0ucJBDkaXaXz0876M67qsPVkNpNQfPday3O_mddbEqy4j2MjnFwzXSrvWyWvdK-EZ0HnQ8gPNiukzbGm_BCSB9ivOmqpu5GrVh9Fm-Dv-G07LyhiMJJlbJtdnqsEOE_3MssjxQGNK21Sv94nhP7tJnlb_CY2J-xl_P7B4QnHEjEzTLZPdeZQ_YVWmDzY3Uz2RGwkplecf",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB3DxQhNuwiNuiuud5DO_orTlv5eq_Ubgr23tcDVBSgD0FT5Yix0FdasEscGtezUVaUkkROCVjZEwOv7sXiYE5cnM55GuhbS-bmTk1vmEPB1O6n0269F_-58chpwWInKY9r7RxX3xZELagNTsmwIDYixIQPtSLyc2eEV-8RwuLvKXasp2PkBPDiPgcrcfFFPrc3nCyUxSnOLhbEKmpZ7jbxvuHSrPJMwzyL47ZAN3poInhJht5PZCj9xz_3ilp-zJ5SCTGPgb_ZD7wb",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAb4W16tKzZmK7cSdfLa6BXb5LiJ82mVNA1zHjV5nNT-DEgvJGEDaPe5pfPezNfb63LhprH3Dne2BEu8j7gf379HzX26rOeWeAdraPoCgbB4_DxHaPr-sy6mtsOoOSVStdqMR3P8MX0nREUkvdJatQOymjNJCKSDOecVaK9efFCGjb0A9E692nJUxTr0J8znCNDutoXON6C0g8Q7IkX1rEVXN_MpEJtOWxp-mJ3UleisTzLEFlxwIN-4-uFctj3js-yCxhJJOFSlcXr",
];

// ==================== STATE ====================
let searchType = "flights";
let currentResults = [];
let searchFrom = "";
let searchTo = "";
let currentSort = "price";
let displayCount = 6;
let searchHistory = JSON.parse(localStorage.getItem('staygo_searchHistory') || '[]');

// ==================== SEARCH HISTORY MANAGEMENT ====================
/**
 * Save a search to history
 * @param {string} type - Search type (flights, hotels, trains, buses)
 * @param {string} from - Origin city
 * @param {string} to - Destination city
 */
function saveSearchToHistory(type, from, to) {
  try {
    const search = { type, from, to, timestamp: new Date().toISOString() };
    searchHistory = [search, ...searchHistory.filter(s => !(s.type === type && s.from === from && s.to === to))].slice(0, 10);
    localStorage.setItem('staygo_searchHistory', JSON.stringify(searchHistory));
  } catch (e) {
    console.warn("Could not save search history:", e.message);
  }
}

// ==================== INITIALIZATION ====================
document.addEventListener("DOMContentLoaded", () => {
  // Set default date to tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  document.getElementById("search-date").value = tomorrow.toISOString().split("T")[0];

  // Tab switching
  document.querySelectorAll(".search-tab").forEach((tab) => {
    tab.addEventListener("click", () => switchSearchTab(tab.dataset.type));
  });

  // Nav tabs
  document.querySelectorAll(".nav-tab").forEach((tab) => {
    tab.addEventListener("click", (e) => {
      e.preventDefault();
      switchSearchTab(tab.dataset.nav);
      showHome();
    });
  });

  // Sort tabs
  document.querySelectorAll(".sort-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".sort-tab").forEach((t) => {
        t.classList.remove("border-primary");
        t.classList.add("border-transparent");
      });
      tab.classList.remove("border-transparent");
      tab.classList.add("border-primary");
      currentSort = tab.dataset.sort;
      renderResults();
    });
  });

  // Autocomplete
  setupAutocomplete("search-from", "autocomplete-from");
  setupAutocomplete("search-to", "autocomplete-to");

  // Close autocomplete on outside click
  document.addEventListener("click", () => {
    document.querySelectorAll(".autocomplete-list").forEach((d) => d.classList.remove("show"));
  });

  // Stats counter animation
  initScrollReveal();
  animateCounters();

  // Enter key search
  document.querySelectorAll("#search-from, #search-to").forEach((input) => {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") performSearch();
    });
  });
});

// ==================== AUTOCOMPLETE ====================
function setupAutocomplete(inputId, dropdownId) {
  const input = document.getElementById(inputId);
  const dropdown = document.getElementById(dropdownId);

  input.addEventListener("input", () => {
    const val = input.value.toLowerCase().trim();
    if (val.length < 1) { dropdown.classList.remove("show"); return; }
    const matches = INDIAN_CITIES.filter(
      (c) => c.name.toLowerCase().includes(val) ||
             c.code.toLowerCase().includes(val) ||
             c.state.toLowerCase().includes(val) ||
             (c.aliases && c.aliases.some(a => a.toLowerCase().includes(val)))
    ).slice(0, 6);
    if (matches.length === 0) {
      // Show a "search anyway" option for unknown cities
      dropdown.innerHTML = `<div class="autocomplete-item" onclick="selectCity('${inputId}', '${input.value.trim()}', '${dropdownId}')">
        <span class="material-symbols-outlined text-outline text-sm">search</span>
        <div><div class="font-semibold text-sm text-on-surface">Search "${input.value.trim()}"</div><div class="text-[10px] text-on-surface-variant">Custom destination</div></div>
      </div>`;
      dropdown.classList.add("show");
      return;
    }
    dropdown.innerHTML = matches.map(
      (c) => `<div class="autocomplete-item" onclick="selectCity('${inputId}', '${c.name}', '${dropdownId}')">
        <span class="material-symbols-outlined text-outline text-sm">location_on</span>
        <div><div class="font-semibold text-sm text-on-surface">${c.name} (${c.code})</div><div class="text-[10px] text-on-surface-variant">${c.state}${c.aliases ? ' · Also: ' + c.aliases.join(', ') : ''}</div></div>
      </div>`
    ).join("");
    dropdown.classList.add("show");
  });

  input.addEventListener("focus", () => {
    if (input.value.length >= 1) input.dispatchEvent(new Event("input"));
  });

  input.addEventListener("click", (e) => e.stopPropagation());
  dropdown.addEventListener("click", (e) => e.stopPropagation());
}

function selectCity(inputId, cityName, dropdownId) {
  document.getElementById(inputId).value = cityName;
  document.getElementById(dropdownId).classList.remove("show");
}

// ==================== TAB SWITCHING ====================
function switchSearchTab(type) {
  searchType = type;
  // Update search tabs
  document.querySelectorAll(".search-tab").forEach((t) => {
    if (t.dataset.type === type) {
      t.classList.add("bg-primary", "text-white");
      t.classList.remove("text-on-surface-variant");
    } else {
      t.classList.remove("bg-primary", "text-white");
      t.classList.add("text-on-surface-variant");
    }
  });

  // Update nav tabs
  document.querySelectorAll(".nav-tab").forEach((t) => {
    if (t.dataset.nav === type) {
      t.classList.add("text-primary", "font-bold", "border-b-2", "border-primary");
      t.classList.remove("text-slate-600");
    } else {
      t.classList.remove("text-primary", "font-bold", "border-b-2", "border-primary");
      t.classList.add("text-slate-600");
    }
  });

  // Update icon and label for Hotels (city-based, no "To")
  const labelTo = document.getElementById("label-to");
  const iconTo = document.getElementById("icon-to");
  if (type === "hotels") {
    labelTo.textContent = "City";
    iconTo.textContent = "apartment";
    document.getElementById("search-to").placeholder = "e.g. Goa";
  } else {
    labelTo.textContent = "To";
    iconTo.textContent = type === "trains" ? "train" : type === "buses" ? "directions_bus" : "flight_land";
    document.getElementById("search-to").placeholder = "e.g. Mumbai";
  }
}

// ==================== VIEW MANAGEMENT ====================
function showView(id) {
  document.querySelectorAll(".view").forEach((v) => {
    v.classList.remove("active");
  });
  setTimeout(() => {
    document.getElementById(id).classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 50);
}

function showHome() {
  showView("view-home");
}

// ==================== MOBILE MENU ====================
function toggleMobileMenu() {
  document.getElementById("mobile-menu").classList.toggle("hidden");
}

// ==================== SEARCH ====================
function quickSearch(city) {
  document.getElementById("search-to").value = city;
  document.getElementById("search-from").value = "New Delhi";
  switchSearchTab("hotels");
  performSearch();
}

function performSearch() {
  searchFrom = document.getElementById("search-from").value.trim();
  searchTo = document.getElementById("search-to").value.trim();

  // Validate inputs
  const validation = validateSearchInputs(searchFrom, searchTo);
  if (!validation.isValid) {
    showToast(validation.message, "error");
    return;
  }

  // Show loading
  const loadingIcon = document.getElementById("loading-icon");
  loadingIcon.textContent = searchType === "flights" ? "flight" : searchType === "hotels" ? "hotel" : searchType === "trains" ? "train" : "directions_bus";
  document.getElementById("loading-bar").style.animation = "none";
  void document.getElementById("loading-bar").offsetHeight;
  document.getElementById("loading-bar").style.animation = "";

  showView("view-loading");

  // Simulate platform scanning
  const platforms = PLATFORMS[searchType];
  let idx = 0;
  const platformNameEl = document.getElementById("loading-platform-name");
  const countEl = document.getElementById("loading-count");
  const scanInterval = setInterval(() => {
    if (idx < platforms.length) {
      platformNameEl.textContent = platforms[idx];
      countEl.textContent = `Checked ${idx + 1} of ${platforms.length} platforms`;
      idx++;
    }
  }, 200);

  setTimeout(async () => {
    clearInterval(scanInterval);
    
    // Check if real data backend is available
    const backendAvailable = await hasRealDataConfigured();
    if (!backendAvailable) {
      // Show setup message instead of results
      showView("view-setup-required");
      return;
    }
    
    countEl.textContent = `Checked ${platforms.length} of ${platforms.length} platforms`;
    // Fetch real results asynchronously
    currentResults = await generateResultsAsync(searchType, searchFrom, searchTo);
    
    // Store hotel results for modal
    if (searchType === "hotels") {
      currentHotelResults = currentResults;
    }
    
    displayCount = 6;
    currentSort = "price";
    
    // Save to search history
    saveSearchToHistory(searchType, searchFrom, searchTo);

    // Update results header
    if (searchType === "hotels") {
      document.getElementById("results-title").textContent = `Hotels in ${searchTo}`;
    } else {
      document.getElementById("results-title").textContent = `${searchFrom} → ${searchTo}`;
    }
    const dateVal = document.getElementById("search-date").value;
    const travelersVal = document.getElementById("search-travelers").value;
    document.getElementById("results-subtitle").textContent = `${dateVal ? new Date(dateVal).toLocaleDateString("en-IN", { day: "numeric", month: "short" }) : "Flexible"} • ${travelersVal} Adult${travelersVal > 1 ? "s" : ""}`;

    // Update sort tabs
    updateSortTabs();

    // Render filters
    renderFilters();

    // Render results
    renderResults();

    // Show data source banner
    showDataSourceBanner();

    // Render smart recommendations only if there are results
    if (currentResults && currentResults.length > 0) {
      renderSmartRecommendations(searchType, searchFrom, searchTo);
    }

    showView("view-results");
  }, 3000);
}

// ==================== DATA GENERATION ====================
// Check if Puppeteer backend server is available
async function hasRealDataConfigured() {
  // Use the backend status check from realdata.js (handles both localhost and Netlify)
  if (typeof checkBackendStatus === 'function') {
    return await checkBackendStatus();
  }
  
  // Fallback: try localhost
  try {
    const response = await fetch('http://localhost:3000/health');
    return response.ok;
  } catch (error) {
    return false;
  }
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Helper: find city by name, code or alias — fallback to creating a virtual entry
function findCity(query) {
  if (!query) return INDIAN_CITIES[0];
  const q = query.toLowerCase().trim();
  return INDIAN_CITIES.find(
    (c) => c.name.toLowerCase() === q ||
           c.code.toLowerCase() === q ||
           c.name.toLowerCase().includes(q) ||
           (c.aliases && c.aliases.some(a => a.toLowerCase().includes(q)))
  ) || { name: query, code: query.substring(0, 3).toUpperCase(), state: "India" };
}

function generateResults(type, from, to) {
  // Demo data disabled - only real data is allowed
  if (!hasRealDataConfigured()) {
    return null; // Signal that no data is available
  }
  
  // Return null - real data will be fetched asynchronously
  return null;
}

async function generateResultsAsync(type, from, to) {
  try {
    let results = [];
    
    switch (type) {
      case "flights": {
        const fromCity = findCity(from);
        const toCity = findCity(to);
        results = await fetchRealFlights(fromCity.name, toCity.name, document.getElementById("search-date").value || new Date().toISOString().split('T')[0]) || [];
        break;
      }
      case "hotels": {
        results = await fetchRealHotels(to, document.getElementById("search-date").value || new Date().toISOString().split('T')[0], document.getElementById("search-date").value || new Date().toISOString().split('T')[0]) || [];
        break;
      }
      case "trains": {
        const fromCity = findCity(from);
        const toCity = findCity(to);
        results = await fetchRealTrains(fromCity.name, toCity.name, document.getElementById("search-date").value || new Date().toISOString().split('T')[0]) || [];
        break;
      }
      case "buses": {
        results = await fetchRealBuses(from, to, document.getElementById("search-date").value || new Date().toISOString().split('T')[0]) || [];
        break;
      }
    }
    
    // Ensure results is always an array
    if (!Array.isArray(results)) results = [];
    if (results.length === 0) return [];
    
    // Sort by cheapest price
    results.sort((a, b) => (a.bestPrice || 0) - (b.bestPrice || 0));
    return results;
  } catch (error) {
    console.error('❌ Error generating results:', error);
    return [];
  }
}

function generateFlights(results, from, to) {
  // This will be called by generateResults() which already checks hasRealDataConfigured()
  // For now, return empty - real data is fetched asynchronously
  return;
}

function generateHotels(results, city) {
  for (let i = 0; i < 10; i++) {
    const hotel = HOTEL_CHAINS[i % HOTEL_CHAINS.length];
    const stars = i < 3 ? 5 : i < 6 ? 4 : 3;
    const basePrice = stars === 5 ? rand(8000, 28000) : stars === 4 ? rand(3500, 12000) : rand(1200, 5000);

    const prices = {};
    PLATFORMS.hotels.forEach((p) => {
      const variation = rand(-1500, 2500);
      prices[p] = Math.max(basePrice + variation, 800);
    });

    const sortedPrices = Object.entries(prices).sort((a, b) => a[1] - b[1]);
    const bestPrice = sortedPrices[0][1];
    const bestPlatform = sortedPrices[0][0];

    const amenitiesList = ["Free WiFi", "Breakfast", "Swimming Pool", "Spa", "Gym", "Parking", "Room Service", "Air Purification", "City View", "Butler Service"];
    const selectedAmenities = amenitiesList.sort(() => Math.random() - 0.5).slice(0, rand(3, 5));

    results.push({
      type: "hotel",
      name: `${hotel} ${city}`,
      stars: stars,
      location: `${["Connaught Place", "MG Road", "Bandra West", "Koramangala", "Anna Nagar", "Salt Lake", "Jubilee Hills", "SG Highway", "C-Scheme", "Calangute"][i % 10]}, ${city}`,
      image: HOTEL_IMAGES[i % HOTEL_IMAGES.length],
      prices: prices,
      bestPrice: bestPrice,
      bestPlatform: bestPlatform,
      sortedPrices: sortedPrices,
      amenities: selectedAmenities,
      rating: (rand(70, 98) / 10).toFixed(1),
      reviews: rand(200, 5000),
    });
  }
}

function generateTrains(results, from, to) {
  const fromCity = findCity(from);
  const toCity = findCity(to);

  const classes = [
    { code: "1A", name: "First AC", mult: 3.5 },
    { code: "2A", name: "AC 2 Tier", mult: 2.2 },
    { code: "3A", name: "AC 3 Tier", mult: 1.5 },
    { code: "SL", name: "Sleeper", mult: 1.0 },
    { code: "CC", name: "Chair Car", mult: 1.3 },
  ];

  for (let i = 0; i < 10; i++) {
    const trainName = TRAIN_TYPES[i % TRAIN_TYPES.length];
    const trainNo = rand(12000, 22999);
    const basePrice = rand(400, 900);
    const depHour = rand(4, 23);
    const durMin = rand(180, 1200);
    const arrHour = (depHour + Math.floor(durMin / 60)) % 24;

    const availableClasses = classes.filter(() => Math.random() > 0.3);
    if (availableClasses.length === 0) availableClasses.push(classes[3]);

    // Prices from different platforms for the cheapest class
    const prices = {};
    PLATFORMS.trains.forEach((p) => {
      if (p === "IRCTC") {
        prices[p] = basePrice; // IRCTC is baseline
      } else {
        const variation = rand(-50, 200);
        prices[p] = basePrice + variation;
      }
    });

    const sortedPrices = Object.entries(prices).sort((a, b) => a[1] - b[1]);
    const bestPrice = sortedPrices[0][1];
    const bestPlatform = sortedPrices[0][0];

    results.push({
      type: "train",
      name: trainName,
      code: `${trainNo}`,
      from: `${fromCity.name}`,
      fromCode: fromCity.code,
      to: `${toCity.name}`,
      toCode: toCity.code,
      depTime: `${String(depHour).padStart(2, "0")}:${String(rand(0, 59)).padStart(2, "0")}`,
      arrTime: `${String(arrHour).padStart(2, "0")}:${String(rand(0, 59)).padStart(2, "0")}`,
      duration: `${Math.floor(durMin / 60)}h ${durMin % 60}m`,
      durationMin: durMin,
      classes: availableClasses.map((c) => ({
        ...c,
        price: Math.round(basePrice * c.mult),
        avail: rand(0, 120),
      })),
      prices: prices,
      bestPrice: bestPrice,
      bestPlatform: bestPlatform,
      sortedPrices: sortedPrices,
      rating: (rand(35, 48) / 10).toFixed(1),
      amenities: trainName.includes("Rajdhani") || trainName.includes("Shatabdi") || trainName.includes("Tejas") ? ["Free Meals", "Blanket & Pillow", "Pantry Car"] : ["Pantry Car"],
    });
  }
}

function generateBuses(results, from, to) {
  const fromCity = findCity(from);
  const toCity = findCity(to);

  const busTypes = ["AC Sleeper", "Non-AC Sleeper", "AC Seater", "Volvo Multi-Axle", "Non-AC Seater", "AC Semi-Sleeper", "Mercedes Multi-Axle", "Scania Multi-Axle"];

  for (let i = 0; i < 10; i++) {
    const operator = BUS_OPERATORS[i % BUS_OPERATORS.length];
    const busType = busTypes[i % busTypes.length];
    const isAC = busType.includes("AC") && !busType.includes("Non-AC");
    const isSleeper = busType.includes("Sleeper");
    const basePrice = isAC ? (isSleeper ? rand(800, 2200) : rand(600, 1600)) : (isSleeper ? rand(400, 1200) : rand(250, 800));
    const depHour = rand(17, 23);
    const durMin = rand(300, 900);
    const arrHour = (depHour + Math.floor(durMin / 60)) % 24;

    const prices = {};
    PLATFORMS.buses.forEach((p) => {
      const variation = rand(-100, 300);
      prices[p] = Math.max(basePrice + variation, 200);
    });

    const sortedPrices = Object.entries(prices).sort((a, b) => a[1] - b[1]);
    const bestPrice = sortedPrices[0][1];
    const bestPlatform = sortedPrices[0][0];

    const amenitiesList = ["WiFi", "Charging Point", "Water Bottle", "Blanket", "Live Tracking", "Emergency Contact", "Reading Light"];
    const selectedAmenities = amenitiesList.sort(() => Math.random() - 0.5).slice(0, rand(2, 4));

    results.push({
      type: "bus",
      name: operator,
      busType: busType,
      from: fromCity.name,
      to: toCity.name,
      depTime: `${String(depHour).padStart(2, "0")}:${String(rand(0, 59)).padStart(2, "0")}`,
      arrTime: `${String(arrHour).padStart(2, "0")}:${String(rand(0, 59)).padStart(2, "0")}`,
      duration: `${Math.floor(durMin / 60)}h ${durMin % 60}m`,
      durationMin: durMin,
      seats: rand(5, 35),
      prices: prices,
      bestPrice: bestPrice,
      bestPlatform: bestPlatform,
      sortedPrices: sortedPrices,
      amenities: selectedAmenities,
      rating: (rand(30, 48) / 10).toFixed(1),
      reviews: rand(50, 3000),
    });
  }
}

// ==================== SORT TAB UPDATES ====================
function updateSortTabs() {
  if (currentResults.length === 0) return; // Skip if no results
  
  const sorted = [...currentResults];

  // Cheapest
  sorted.sort((a, b) => a.bestPrice - b.bestPrice);
  document.getElementById("cheapest-price").textContent = `₹${sorted[0].bestPrice.toLocaleString("en-IN")}`;
  document.getElementById("cheapest-sub").textContent = searchType === "hotels" ? "per night" : sorted[0].duration || "";

  // Fastest
  if (sorted[0].durationMin !== undefined) {
    const fastest = [...currentResults].sort((a, b) => (a.durationMin || 0) - (b.durationMin || 0));
    document.getElementById("fastest-price").textContent = `₹${fastest[0].bestPrice.toLocaleString("en-IN")}`;
    document.getElementById("fastest-sub").textContent = fastest[0].duration;
  } else {
    document.getElementById("fastest-price").textContent = `₹${sorted[0].bestPrice.toLocaleString("en-IN")}`;
    document.getElementById("fastest-sub").textContent = "Top rated";
  }

  // Best value
  const bestIdx = Math.min(2, sorted.length - 1);
  document.getElementById("best-price").textContent = `₹${sorted[bestIdx].bestPrice.toLocaleString("en-IN")}`;
  document.getElementById("best-sub").textContent = "Optimal value";
}

// ==================== RENDER FILTERS ====================
let activeFilters = {};

function renderFilters() {
  const container = document.getElementById("filter-controls");
  activeFilters = { stops: [], airlines: [], stars: [], amenities: [], busTypes: [], trainClasses: [], departure: [] };
  let html = "";

  // Price range filter (all types)
  const prices = currentResults.map(r => r.bestPrice);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  html += `
    <div class="space-y-3 mb-4">
      <div class="flex items-center gap-2 text-primary font-semibold text-sm"><span class="material-symbols-outlined text-sm">currency_rupee</span><span>Price Range</span></div>
      <div class="px-1">
        <input type="range" id="filter-price-range" min="${minPrice}" max="${maxPrice}" value="${maxPrice}" step="100" class="w-full accent-primary" oninput="updatePriceLabel(this.value); applyFilters()"/>
        <div class="flex justify-between text-[10px] text-slate-500 mt-1">
          <span>₹${minPrice.toLocaleString('en-IN')}</span>
          <span id="price-range-label">Up to ₹${maxPrice.toLocaleString('en-IN')}</span>
        </div>
      </div>
    </div>`;

  if (searchType === "flights") {
    html += `
      <div class="space-y-3 mb-4">
        <div class="flex items-center gap-2 text-primary font-semibold text-sm"><span class="material-symbols-outlined text-sm">filter_list</span><span>Stops</span></div>
        <div class="space-y-2">
          <label class="flex items-center justify-between p-2 rounded-lg bg-white cursor-pointer hover:bg-white/50"><span class="text-xs text-slate-700">Non-stop</span><input class="filter-cb rounded text-primary focus:ring-primary" type="checkbox" data-filter="stops" data-value="0" checked onchange="applyFilters()"/></label>
          <label class="flex items-center justify-between p-2 rounded-lg hover:bg-white cursor-pointer"><span class="text-xs text-slate-700">1 stop</span><input class="filter-cb rounded text-primary focus:ring-primary" type="checkbox" data-filter="stops" data-value="1" checked onchange="applyFilters()"/></label>
          <label class="flex items-center justify-between p-2 rounded-lg hover:bg-white cursor-pointer"><span class="text-xs text-slate-700">2+ stops</span><input class="filter-cb rounded text-primary focus:ring-primary" type="checkbox" data-filter="stops" data-value="2" checked onchange="applyFilters()"/></label>
        </div>
      </div>
      <div class="space-y-3 mb-4">
        <div class="flex items-center gap-2 text-primary font-semibold text-sm"><span class="material-symbols-outlined text-sm">flight_takeoff</span><span>Airlines</span></div>
        <div class="space-y-1">${AIRLINES.map((a) => `<label class="flex items-center gap-2 p-1.5 text-xs text-slate-600 cursor-pointer hover:bg-white rounded-lg"><input class="filter-cb rounded text-primary" type="checkbox" data-filter="airlines" data-value="${a}" checked onchange="applyFilters()"/> ${a}</label>`).join("")}</div>
      </div>
      <div class="space-y-3">
        <div class="flex items-center gap-2 text-primary font-semibold text-sm"><span class="material-symbols-outlined text-sm">schedule</span><span>Departure Time</span></div>
        <div class="grid grid-cols-2 gap-2">
          <button class="dep-time-btn p-2 border border-outline-variant rounded-lg text-[10px] flex flex-col items-center gap-1 hover:border-primary hover:bg-white transition-all" data-time="morning" onclick="toggleDepartureFilter(this)"><span class="material-symbols-outlined text-xs">light_mode</span>6AM-12PM</button>
          <button class="dep-time-btn p-2 border border-outline-variant rounded-lg text-[10px] flex flex-col items-center gap-1 hover:border-primary hover:bg-white transition-all" data-time="afternoon" onclick="toggleDepartureFilter(this)"><span class="material-symbols-outlined text-xs">sunny</span>12PM-6PM</button>
          <button class="dep-time-btn p-2 border border-outline-variant rounded-lg text-[10px] flex flex-col items-center gap-1 hover:border-primary hover:bg-white transition-all" data-time="evening" onclick="toggleDepartureFilter(this)"><span class="material-symbols-outlined text-xs">wb_twilight</span>6PM-10PM</button>
          <button class="dep-time-btn p-2 border border-outline-variant rounded-lg text-[10px] flex flex-col items-center gap-1 hover:border-primary hover:bg-white transition-all" data-time="night" onclick="toggleDepartureFilter(this)"><span class="material-symbols-outlined text-xs">dark_mode</span>10PM-6AM</button>
        </div>
      </div>`;
  } else if (searchType === "hotels") {
    html += `
      <div class="space-y-3 mb-4">
        <div class="flex items-center gap-2 text-primary font-semibold text-sm"><span class="material-symbols-outlined text-sm">star</span><span>Star Rating</span></div>
        <div class="space-y-2">
          <label class="flex items-center justify-between p-2 rounded-lg bg-white cursor-pointer"><span class="text-xs text-slate-700">5 Stars</span><input class="filter-cb rounded text-primary focus:ring-primary" type="checkbox" data-filter="stars" data-value="5" checked onchange="applyFilters()"/></label>
          <label class="flex items-center justify-between p-2 rounded-lg hover:bg-white cursor-pointer"><span class="text-xs text-slate-700">4 Stars</span><input class="filter-cb rounded text-primary focus:ring-primary" type="checkbox" data-filter="stars" data-value="4" checked onchange="applyFilters()"/></label>
          <label class="flex items-center justify-between p-2 rounded-lg hover:bg-white cursor-pointer"><span class="text-xs text-slate-700">3 Stars</span><input class="filter-cb rounded text-primary focus:ring-primary" type="checkbox" data-filter="stars" data-value="3" checked onchange="applyFilters()"/></label>
          <label class="flex items-center justify-between p-2 rounded-lg hover:bg-white cursor-pointer"><span class="text-xs text-slate-700">2 Stars & Below</span><input class="filter-cb rounded text-primary focus:ring-primary" type="checkbox" data-filter="stars" data-value="2" checked onchange="applyFilters()"/></label>
        </div>
      </div>
      <div class="space-y-3">
        <div class="flex items-center gap-2 text-primary font-semibold text-sm"><span class="material-symbols-outlined text-sm">pool</span><span>Amenities</span></div>
        <div class="space-y-1">
          <label class="flex items-center gap-2 p-1.5 text-xs text-slate-600 cursor-pointer hover:bg-white rounded-lg"><input class="filter-cb rounded text-primary" type="checkbox" data-filter="amenities" data-value="Breakfast" onchange="applyFilters()"/> Breakfast Included</label>
          <label class="flex items-center gap-2 p-1.5 text-xs text-slate-600 cursor-pointer hover:bg-white rounded-lg"><input class="filter-cb rounded text-primary" type="checkbox" data-filter="amenities" data-value="WiFi" onchange="applyFilters()"/> Free WiFi</label>
          <label class="flex items-center gap-2 p-1.5 text-xs text-slate-600 cursor-pointer hover:bg-white rounded-lg"><input class="filter-cb rounded text-primary" type="checkbox" data-filter="amenities" data-value="Pool" onchange="applyFilters()"/> Pool</label>
          <label class="flex items-center gap-2 p-1.5 text-xs text-slate-600 cursor-pointer hover:bg-white rounded-lg"><input class="filter-cb rounded text-primary" type="checkbox" data-filter="amenities" data-value="Spa" onchange="applyFilters()"/> Spa</label>
        </div>
      </div>`;
  } else if (searchType === "trains") {
    html += `
      <div class="space-y-3 mb-4">
        <div class="flex items-center gap-2 text-primary font-semibold text-sm"><span class="material-symbols-outlined text-sm">airline_seat_recline_extra</span><span>Train Type</span></div>
        <div class="space-y-1">${["Rajdhani", "Shatabdi", "Duronto", "Superfast", "Express"].map(t => `<label class="flex items-center gap-2 p-1.5 text-xs text-slate-600 cursor-pointer hover:bg-white rounded-lg"><input class="filter-cb rounded text-primary" type="checkbox" data-filter="trainClasses" data-value="${t}" checked onchange="applyFilters()"/> ${t}</label>`).join("")}</div>
      </div>
      <div class="space-y-3">
        <div class="flex items-center gap-2 text-primary font-semibold text-sm"><span class="material-symbols-outlined text-sm">schedule</span><span>Departure Time</span></div>
        <div class="grid grid-cols-2 gap-2">
          <button class="dep-time-btn p-2 border border-outline-variant rounded-lg text-[10px] flex flex-col items-center gap-1 hover:border-primary hover:bg-white transition-all" data-time="morning" onclick="toggleDepartureFilter(this)"><span class="material-symbols-outlined text-xs">light_mode</span>6AM-12PM</button>
          <button class="dep-time-btn p-2 border border-outline-variant rounded-lg text-[10px] flex flex-col items-center gap-1 hover:border-primary hover:bg-white transition-all" data-time="afternoon" onclick="toggleDepartureFilter(this)"><span class="material-symbols-outlined text-xs">sunny</span>12PM-6PM</button>
          <button class="dep-time-btn p-2 border border-outline-variant rounded-lg text-[10px] flex flex-col items-center gap-1 hover:border-primary hover:bg-white transition-all" data-time="evening" onclick="toggleDepartureFilter(this)"><span class="material-symbols-outlined text-xs">wb_twilight</span>6PM-10PM</button>
          <button class="dep-time-btn p-2 border border-outline-variant rounded-lg text-[10px] flex flex-col items-center gap-1 hover:border-primary hover:bg-white transition-all" data-time="night" onclick="toggleDepartureFilter(this)"><span class="material-symbols-outlined text-xs">dark_mode</span>10PM-6AM</button>
        </div>
      </div>`;
  } else if (searchType === "buses") {
    html += `
      <div class="space-y-3 mb-4">
        <div class="flex items-center gap-2 text-primary font-semibold text-sm"><span class="material-symbols-outlined text-sm">directions_bus</span><span>Bus Type</span></div>
        <div class="space-y-2">
          <label class="flex items-center justify-between p-2 rounded-lg bg-white cursor-pointer"><span class="text-xs text-slate-700">AC Sleeper</span><input class="filter-cb rounded text-primary" type="checkbox" data-filter="busTypes" data-value="AC Sleeper" checked onchange="applyFilters()"/></label>
          <label class="flex items-center justify-between p-2 rounded-lg hover:bg-white cursor-pointer"><span class="text-xs text-slate-700">AC Seater</span><input class="filter-cb rounded text-primary" type="checkbox" data-filter="busTypes" data-value="AC Seater" checked onchange="applyFilters()"/></label>
          <label class="flex items-center justify-between p-2 rounded-lg hover:bg-white cursor-pointer"><span class="text-xs text-slate-700">Non-AC</span><input class="filter-cb rounded text-primary" type="checkbox" data-filter="busTypes" data-value="Non-AC" checked onchange="applyFilters()"/></label>
          <label class="flex items-center justify-between p-2 rounded-lg hover:bg-white cursor-pointer"><span class="text-xs text-slate-700">Volvo Multi-Axle</span><input class="filter-cb rounded text-primary" type="checkbox" data-filter="busTypes" data-value="Volvo" checked onchange="applyFilters()"/></label>
        </div>
      </div>
      <div class="space-y-3">
        <div class="flex items-center gap-2 text-primary font-semibold text-sm"><span class="material-symbols-outlined text-sm">schedule</span><span>Departure</span></div>
        <div class="grid grid-cols-2 gap-2">
          <button class="dep-time-btn p-2 border border-outline-variant rounded-lg text-[10px] flex flex-col items-center gap-1 hover:border-primary hover:bg-white transition-all" data-time="evening" onclick="toggleDepartureFilter(this)"><span class="material-symbols-outlined text-xs">wb_twilight</span>6PM-10PM</button>
          <button class="dep-time-btn p-2 border border-outline-variant rounded-lg text-[10px] flex flex-col items-center gap-1 hover:border-primary hover:bg-white transition-all" data-time="night" onclick="toggleDepartureFilter(this)"><span class="material-symbols-outlined text-xs">dark_mode</span>10PM-6AM</button>
        </div>
      </div>`;
  }

  // Results count
  html += `<div class="mt-4 pt-3 border-t border-outline-variant/20 text-center"><p class="text-xs text-on-surface-variant" id="filter-count">${currentResults.length} results found</p></div>`;

  container.innerHTML = html;
}

function updatePriceLabel(val) {
  document.getElementById('price-range-label').textContent = 'Up to ₹' + parseInt(val).toLocaleString('en-IN');
}

function toggleDepartureFilter(btn) {
  btn.classList.toggle('border-primary');
  btn.classList.toggle('bg-primary');
  btn.classList.toggle('text-white');
  btn.classList.toggle('border-outline-variant');
  applyFilters();
}

function getDepHour(timeStr) {
  if (!timeStr) return 12;
  const parts = timeStr.match(/(\d+):(\d+)/);
  if (!parts) return 12;
  return parseInt(parts[1]);
}

function applyFilters() {
  // Read price range
  const priceSlider = document.getElementById('filter-price-range');
  const maxPrice = priceSlider ? parseInt(priceSlider.value) : Infinity;

  // Read checkbox filters
  const checkedStops = [...document.querySelectorAll('.filter-cb[data-filter="stops"]:checked')].map(c => c.dataset.value);
  const checkedAirlines = [...document.querySelectorAll('.filter-cb[data-filter="airlines"]:checked')].map(c => c.dataset.value);
  const checkedStars = [...document.querySelectorAll('.filter-cb[data-filter="stars"]:checked')].map(c => parseInt(c.dataset.value));
  const checkedAmenities = [...document.querySelectorAll('.filter-cb[data-filter="amenities"]:checked')].map(c => c.dataset.value);
  const checkedBusTypes = [...document.querySelectorAll('.filter-cb[data-filter="busTypes"]:checked')].map(c => c.dataset.value);
  const checkedTrainClasses = [...document.querySelectorAll('.filter-cb[data-filter="trainClasses"]:checked')].map(c => c.dataset.value);

  // Read departure time buttons
  const activeTimes = [...document.querySelectorAll('.dep-time-btn.bg-primary')].map(b => b.dataset.time);

  let filtered = currentResults.filter(item => {
    // Price filter
    if (item.bestPrice > maxPrice) return false;

    // Flights filters
    if (item.type === 'flight') {
      if (checkedStops.length > 0) {
        const stopVal = item.stops >= 2 ? '2' : String(item.stops);
        if (!checkedStops.includes(stopVal)) return false;
      }
      if (checkedAirlines.length > 0 && !checkedAirlines.includes(item.name)) return false;
    }

    // Hotel filters
    if (item.type === 'hotel') {
      if (checkedStars.length > 0) {
        const starMatch = checkedStars.some(s => s <= 2 ? item.stars <= 2 : item.stars === s);
        if (!starMatch) return false;
      }
      if (checkedAmenities.length > 0) {
        const hasAmenity = checkedAmenities.some(a => item.amenities.some(ia => ia.toLowerCase().includes(a.toLowerCase())));
        if (!hasAmenity) return false;
      }
    }

    // Bus filters
    if (item.type === 'bus' && checkedBusTypes.length > 0) {
      const busMatch = checkedBusTypes.some(bt => item.busType && item.busType.toLowerCase().includes(bt.toLowerCase()));
      if (!busMatch) return false;
    }

    // Train filters
    if (item.type === 'train' && checkedTrainClasses.length > 0) {
      const trainMatch = checkedTrainClasses.some(tc => item.name && item.name.toLowerCase().includes(tc.toLowerCase()));
      if (!trainMatch) return false;
    }

    // Departure time filter
    if (activeTimes.length > 0 && item.depTime) {
      const h = getDepHour(item.depTime);
      const timeSlot =
        h >= 6 && h < 12 ? 'morning' :
        h >= 12 && h < 18 ? 'afternoon' :
        h >= 18 && h < 22 ? 'evening' : 'night';
      if (!activeTimes.includes(timeSlot)) return false;
    }

    return true;
  });

  // Update count
  const countEl = document.getElementById('filter-count');
  if (countEl) countEl.textContent = `${filtered.length} of ${currentResults.length} results`;

  // Re-render with filtered results
  renderFilteredResults(filtered);
}

function renderFilteredResults(filtered) {
  const container = document.getElementById("results-container");
  let sorted = [...filtered];

  if (currentSort === "price") sorted.sort((a, b) => a.bestPrice - b.bestPrice);
  else if (currentSort === "fastest") sorted.sort((a, b) => (a.durationMin || 0) - (b.durationMin || 0));
  else if (currentSort === "rating") sorted.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));

  const toShow = sorted.slice(0, displayCount);
  let html = "";

  toShow.forEach((item, idx) => {
    const delay = idx * 0.05;
    switch (item.type) {
      case "flight": html += renderFlightCard(item, idx, delay); break;
      case "hotel": html += renderHotelCard(item, idx, delay); break;
      case "train": html += renderTrainCard(item, idx, delay); break;
      case "bus": html += renderBusCard(item, idx, delay); break;
    }
  });

  if (!html) {
    html = `<div class="text-center py-16"><span class="material-symbols-outlined text-5xl text-outline mb-4">search_off</span><h3 class="text-lg font-bold text-primary mb-2">No results match your filters</h3><p class="text-sm text-on-surface-variant">Try adjusting your filters to see more options</p></div>`;
  }

  container.innerHTML = html;

  // Update load more
  const loadMoreWrap = document.getElementById("load-more-wrap");
  if (loadMoreWrap) loadMoreWrap.style.display = sorted.length > displayCount ? "flex" : "none";
}

function resetFilters() {
  renderFilters();
  renderResults();
}

// ==================== RENDER RESULTS ====================
function renderResults() {
  const container = document.getElementById("results-container");
  let sorted = [...currentResults];

  // Show "No results" message if empty
  if (sorted.length === 0) {
    container.innerHTML = `
      <div class="text-center py-12 px-6">
        <div class="text-6xl mb-4">🔍</div>
        <h2 class="text-2xl font-bold text-on-surface mb-2">No Results Found</h2>
        <p class="text-on-surface-variant mb-6">
          Unfortunately, no ${searchType} options are available for this route on the selected date.
          <br/>Please try a different route or date.
        </p>
        <button onclick="showHome()" class="px-6 py-3 bg-primary text-on-primary rounded-full font-semibold hover:shadow-lg transition-all">
          Try Another Search
        </button>
      </div>
    `;
    document.getElementById("load-more-wrap").style.display = "none";
    return;
  }

  if (currentSort === "price") sorted.sort((a, b) => a.bestPrice - b.bestPrice);
  else if (currentSort === "fastest") sorted.sort((a, b) => (a.durationMin || 0) - (b.durationMin || 0));
  else if (currentSort === "rating") sorted.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));

  const toShow = sorted.slice(0, displayCount);
  let html = "";

  toShow.forEach((item, idx) => {
    const delay = idx * 0.1;
    switch (item.type) {
      case "flight":
        html += renderFlightCard(item, idx, delay);
        break;
      case "hotel":
        html += renderHotelCard(item, idx, delay);
        break;
      case "train":
        html += renderTrainCard(item, idx, delay);
        break;
      case "bus":
        html += renderBusCard(item, idx, delay);
        break;
    }
  });

  container.innerHTML = html;

  // Show/hide load more
  document.getElementById("load-more-wrap").style.display = displayCount < sorted.length ? "flex" : "none";
}

function loadMore() {
  displayCount += 4;
  renderResults();
}

// ==================== CARD RENDERERS ====================
function renderFlightCard(item, idx, delay) {
  const isBest = idx === 0;
  return `
    <div class="bg-surface-container-lowest rounded-2xl p-4 md:p-6 transition-all hover:translate-y-[-2px] group fade-in-up ${isBest ? 'ring-2 ring-secondary/30' : ''}" style="animation-delay: ${delay}s">
      ${isBest ? '<div class="absolute top-3 right-3 bg-secondary-container text-white px-3 py-1 rounded-full text-[10px] font-bold badge-pulse relative">CHEAPEST</div>' : ''}
      <div class="flex flex-col md:flex-row items-center gap-4 md:gap-8 relative">
        <div class="w-full md:w-28 flex flex-row md:flex-col items-center md:items-start gap-3 md:gap-2">
          <div class="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-surface-container flex items-center justify-center flex-shrink-0">
            <span class="material-symbols-outlined text-primary">flight</span>
          </div>
          <div>
            <p class="text-sm font-semibold text-slate-800">${item.name}</p>
            <p class="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">${item.code}</p>
          </div>
        </div>
        <div class="flex-1 grid grid-cols-3 items-center gap-2 md:gap-4 text-center md:text-left w-full">
          <div>
            <h3 class="text-lg md:text-xl font-bold brand-font text-primary">${item.depTime}</h3>
            <p class="text-[10px] md:text-xs text-slate-500 font-medium">${item.from}</p>
          </div>
          <div class="flex flex-col items-center gap-1">
            <p class="text-[9px] md:text-[10px] font-bold ${item.stops === 0 ? 'text-on-tertiary-container bg-tertiary-fixed-dim/20' : 'text-on-surface-variant bg-surface-container-high'} px-2 py-0.5 rounded-full">${item.stopsText}</p>
            <div class="w-full flex items-center gap-1">
              <div class="h-[1px] flex-1 bg-outline-variant"></div>
              <span class="material-symbols-outlined text-xs text-outline">flight</span>
              <div class="h-[1px] flex-1 bg-outline-variant"></div>
            </div>
            <p class="text-[9px] md:text-[10px] text-slate-400">${item.duration}</p>
          </div>
          <div class="text-right">
            <h3 class="text-lg md:text-xl font-bold brand-font text-primary">${item.arrTime}</h3>
            <p class="text-[10px] md:text-xs text-slate-500 font-medium">${item.to}</p>
          </div>
        </div>
        <div class="w-full md:w-48 pl-0 md:pl-6 border-t md:border-t-0 md:border-l border-surface-container flex flex-col items-center md:items-end justify-center pt-3 md:pt-0">
          <p class="text-xl md:text-2xl font-bold brand-font text-secondary mb-0.5">₹${item.bestPrice.toLocaleString("en-IN")}</p>
          <p class="text-[10px] text-slate-400 mb-2">via ${item.bestPlatform}</p>
          <button class="w-full py-2 mb-1.5 bg-secondary hover:bg-secondary-container text-white rounded-full font-bold text-sm shadow-lg shadow-secondary/10 transition-all active:scale-95" onclick="openDeal('${item.bestPlatform}', 'flights')">Book Now</button>
          <button class="w-full py-1.5 text-primary border border-primary/30 hover:bg-primary-fixed/10 rounded-full font-semibold text-xs transition-all" onclick="togglePriceCompare(${idx})">Compare ${item.sortedPrices.length} Prices ▾</button>
        </div>
      </div>
      <!-- Amenities -->
      <div class="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-surface-container-low flex flex-wrap justify-between items-center gap-2">
        <div class="flex flex-wrap gap-2 md:gap-4">
          ${item.amenities.map((a) => `<span class="text-[9px] md:text-[10px] font-bold text-on-surface-variant flex items-center gap-1"><span class="material-symbols-outlined text-xs">luggage</span>${a}</span>`).join("")}
        </div>
        <span class="text-[10px] text-on-surface-variant">⭐ ${item.rating}/5</span>
      </div>
      <!-- Price Comparison (hidden by default) -->
      <div class="hidden mt-4 p-4 bg-surface-container-low rounded-xl" id="price-compare-${idx}">
        <h4 class="text-xs font-bold text-primary mb-3 flex items-center gap-1"><span class="material-symbols-outlined text-sm">compare_arrows</span> Price Comparison (Low → High) — Click to book</h4>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
          ${item.sortedPrices.map(([platform, price], i) => `
            <div class="flex items-center justify-between p-2 rounded-lg ${i === 0 ? 'bg-tertiary-fixed/10 ring-1 ring-on-tertiary-container/20' : 'bg-white hover:bg-surface-container-low'} text-sm cursor-pointer transition-colors" onclick="openDeal('${platform}', 'flights')">
              <span class="${i === 0 ? 'font-bold text-on-tertiary-container' : 'text-on-surface-variant'}">${platform}</span>
              <div class="flex items-center gap-2">
                <span class="font-bold ${i === 0 ? 'text-on-tertiary-container' : 'text-primary'}">₹${price.toLocaleString("en-IN")}${i === 0 ? ' ✓' : ''}</span>
                <span class="material-symbols-outlined text-xs text-outline">open_in_new</span>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    </div>`;
}

function renderHotelCard(item, idx, delay) {
  const isBest = idx === 0;
  return `
    <article class="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group fade-in-up" style="animation-delay: ${delay}s">
      <div class="flex flex-col lg:flex-row h-full">
        <div class="lg:w-1/3 relative overflow-hidden h-[200px] lg:h-auto cursor-pointer" onclick="showHotelDetails(${idx})" title="Click to view details">
          <img alt="${item.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="${item.image}"/>
          ${isBest ? '<div class="absolute top-4 left-4 bg-secondary-container text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg badge-pulse">BEST DEAL</div>' : ''}
        </div>
        <div class="flex-1 p-4 md:p-6 flex flex-col justify-between border-r border-outline-variant/10">
          <div>
            <div class="flex items-center gap-0.5 mb-1">${"<span class='material-symbols-outlined filled text-secondary text-sm'>star</span>".repeat(item.stars)}</div>
            <h3 class="text-xl md:text-2xl font-extrabold brand-font text-primary mb-1">${item.name}</h3>
            <div class="flex items-center gap-1 text-on-surface-variant text-xs md:text-sm mb-3">
              <span class="material-symbols-outlined text-sm">location_on</span>${item.location}
            </div>
            <div class="flex flex-wrap gap-1.5 md:gap-2">
              ${item.amenities.map((a) => `<span class="px-2 md:px-3 py-1 bg-surface-container rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">${a}</span>`).join("")}
            </div>
          </div>
          <div class="mt-4 md:mt-6 flex items-center gap-2">
            <div class="bg-tertiary-container/10 text-on-tertiary-container px-3 py-1 rounded-lg flex items-center gap-1">
              <span class="material-symbols-outlined text-sm">verified</span>
              <span class="text-xs font-bold">${item.rating}/10</span>
            </div>
            <span class="text-xs text-on-surface-variant">(${item.reviews.toLocaleString()} reviews)</span>
          </div>
        </div>
        <div class="lg:w-1/4 p-4 md:p-6 bg-surface-container-low flex flex-col justify-between">
          <div class="space-y-2 md:space-y-3">
            <div class="flex items-center justify-between text-xs border-b border-outline-variant/10 pb-2">
              <span class="font-semibold text-primary">Platform</span>
              <span class="font-semibold text-primary">Price/night</span>
            </div>
            <div class="space-y-1.5 md:space-y-2 max-h-40 overflow-y-auto pr-1 custom-scrollbar">
              ${item.sortedPrices.slice(0, 7).map(([platform, price], i) => `
                <div class="flex items-center justify-between text-xs md:text-sm ${i === 0 ? 'text-on-tertiary-container font-bold' : 'text-on-surface-variant'} cursor-pointer hover:bg-surface-container rounded-md px-1 py-0.5 transition-colors" onclick="openDeal('${platform}', 'hotels')">
                  <span>${platform}</span>
                  <div class="flex items-center gap-1">
                    <span class="${i === 0 ? '' : 'font-bold text-primary'}">₹${price.toLocaleString("en-IN")}${i === 0 ? ' ✓' : ''}</span>
                    <span class="material-symbols-outlined text-[10px] text-outline">open_in_new</span>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
          <div class="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-outline-variant/20">
            <div class="text-[10px] md:text-xs text-on-surface-variant mb-1">Lowest per night</div>
            <div class="text-xl md:text-2xl font-black text-primary mb-3 md:mb-4">₹${item.bestPrice.toLocaleString("en-IN")}</div>
            <button class="w-full bg-secondary py-2.5 md:py-3 rounded-full text-white font-bold text-sm hover:bg-secondary-container transition-colors shadow-lg shadow-secondary/20" onclick="openDeal('${item.bestPlatform}', 'hotels')">Book on ${item.bestPlatform} →</button>
          </div>
        </div>
      </div>
    </article>`;
}

function renderTrainCard(item, idx, delay) {
  const isBest = idx === 0;
  return `
    <div class="bg-surface-container-lowest rounded-2xl p-4 md:p-6 transition-all hover:translate-y-[-2px] group fade-in-up ${isBest ? 'ring-2 ring-secondary/30' : ''}" style="animation-delay: ${delay}s">
      ${isBest ? '<div class="text-[10px] font-bold text-on-tertiary-container bg-tertiary-fixed-dim/20 px-3 py-1 rounded-full inline-block mb-3">🏆 CHEAPEST OPTION</div>' : ''}
      <div class="flex flex-col md:flex-row items-center gap-4 md:gap-8">
        <div class="w-full md:w-32 flex flex-row md:flex-col items-center md:items-start gap-3 md:gap-2">
          <div class="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-surface-container flex items-center justify-center flex-shrink-0">
            <span class="material-symbols-outlined text-primary">train</span>
          </div>
          <div>
            <p class="text-sm font-semibold text-slate-800">${item.name}</p>
            <p class="text-[10px] text-slate-400 font-bold uppercase">#${item.code}</p>
          </div>
        </div>
        <div class="flex-1 grid grid-cols-3 items-center gap-2 md:gap-4 text-center md:text-left w-full">
          <div>
            <h3 class="text-lg md:text-xl font-bold brand-font text-primary">${item.depTime}</h3>
            <p class="text-[10px] md:text-xs text-slate-500 font-medium">${item.from}</p>
          </div>
          <div class="flex flex-col items-center gap-1">
            <div class="w-full flex items-center gap-1">
              <div class="h-[1px] flex-1 bg-outline-variant"></div>
              <span class="material-symbols-outlined text-xs text-outline">train</span>
              <div class="h-[1px] flex-1 bg-outline-variant"></div>
            </div>
            <p class="text-[9px] md:text-[10px] text-slate-400">${item.duration}</p>
          </div>
          <div class="text-right">
            <h3 class="text-lg md:text-xl font-bold brand-font text-primary">${item.arrTime}</h3>
            <p class="text-[10px] md:text-xs text-slate-500 font-medium">${item.to}</p>
          </div>
        </div>
        <div class="w-full md:w-48 pl-0 md:pl-6 border-t md:border-t-0 md:border-l border-surface-container flex flex-col items-center md:items-end justify-center pt-3 md:pt-0">
          <p class="text-xl md:text-2xl font-bold brand-font text-secondary mb-0.5">₹${item.bestPrice.toLocaleString("en-IN")}</p>
          <p class="text-[10px] text-slate-400 mb-2">via ${item.bestPlatform} (SL)</p>
          <button class="w-full py-2 mb-1.5 bg-secondary hover:bg-secondary-container text-white rounded-full font-bold text-sm shadow-lg shadow-secondary/10 transition-all active:scale-95" onclick="openDeal('${item.bestPlatform}', 'trains')">Book Now</button>
          <button class="w-full py-1.5 text-primary border border-primary/30 hover:bg-primary-fixed/10 rounded-full font-semibold text-xs transition-all" onclick="togglePriceCompare(${idx})">Compare ${item.sortedPrices.length} Prices ▾</button>
        </div>
      </div>
      <!-- Classes -->
      <div class="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-surface-container-low flex flex-wrap gap-2">
        ${(item.classes || []).map((c) => {
          const classPrice = c && c.price ? c.price : 0;
          const classAvail = c && typeof c.avail !== 'undefined' ? c.avail : 0;
          const classCode = c && c.code ? c.code : 'Unknown';
          return `
          <div class="px-3 py-1.5 rounded-lg border ${classAvail > 0 ? 'border-on-tertiary-container/20 bg-tertiary-fixed/5' : 'border-error/20 bg-error-container/10'} text-[10px]">
            <span class="font-bold ${classAvail > 0 ? 'text-on-tertiary-container' : 'text-error'}">${classCode}</span>
            <span class="text-slate-500 ml-1">₹${classPrice.toLocaleString("en-IN")}</span>
            <span class="ml-1 ${classAvail > 0 ? 'text-on-tertiary-container' : 'text-error'}">${classAvail > 0 ? `${classAvail} avl` : 'WL'}</span>
          </div>
        `;
        }).join("")}
        ${item.amenities.map((a) => `<span class="text-[10px] font-bold text-on-surface-variant flex items-center gap-1"><span class="material-symbols-outlined text-xs">restaurant</span>${a}</span>`).join("")}
      </div>
      <!-- Hidden price comparison -->
      <div class="hidden mt-4 p-4 bg-surface-container-low rounded-xl" id="price-compare-${idx}">
        <h4 class="text-xs font-bold text-primary mb-3 flex items-center gap-1"><span class="material-symbols-outlined text-sm">compare_arrows</span> Platform Price Comparison — Click to book</h4>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
          ${item.sortedPrices.map(([platform, price], i) => `
            <div class="flex items-center justify-between p-2 rounded-lg ${i === 0 ? 'bg-tertiary-fixed/10 ring-1 ring-on-tertiary-container/20' : 'bg-white hover:bg-surface-container-low'} text-sm cursor-pointer transition-colors" onclick="openDeal('${platform}', 'trains')">
              <span class="${i === 0 ? 'font-bold text-on-tertiary-container' : 'text-on-surface-variant'}">${platform}</span>
              <div class="flex items-center gap-2">
                <span class="font-bold ${i === 0 ? 'text-on-tertiary-container' : 'text-primary'}">₹${price.toLocaleString("en-IN")}${i === 0 ? ' ✓' : ''}</span>
                <span class="material-symbols-outlined text-xs text-outline">open_in_new</span>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    </div>`;
}

function renderBusCard(item, idx, delay) {
  const isBest = idx === 0;
  return `
    <div class="bg-surface-container-lowest rounded-2xl p-4 md:p-6 transition-all hover:translate-y-[-2px] group fade-in-up ${isBest ? 'ring-2 ring-secondary/30' : ''}" style="animation-delay: ${delay}s">
      ${isBest ? '<div class="text-[10px] font-bold text-on-tertiary-container bg-tertiary-fixed-dim/20 px-3 py-1 rounded-full inline-block mb-3">🏆 CHEAPEST BUS</div>' : ''}
      <div class="flex flex-col md:flex-row items-center gap-4 md:gap-8">
        <div class="w-full md:w-36 flex flex-row md:flex-col items-center md:items-start gap-3 md:gap-2">
          <div class="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-surface-container flex items-center justify-center flex-shrink-0">
            <span class="material-symbols-outlined text-primary">directions_bus</span>
          </div>
          <div>
            <p class="text-sm font-semibold text-slate-800">${item.name}</p>
            <p class="text-[10px] text-slate-400 font-bold">${item.busType}</p>
          </div>
        </div>
        <div class="flex-1 grid grid-cols-3 items-center gap-2 md:gap-4 text-center md:text-left w-full">
          <div>
            <h3 class="text-lg md:text-xl font-bold brand-font text-primary">${item.depTime}</h3>
            <p class="text-[10px] md:text-xs text-slate-500 font-medium">${item.from}</p>
          </div>
          <div class="flex flex-col items-center gap-1">
            <div class="w-full flex items-center gap-1">
              <div class="h-[1px] flex-1 bg-outline-variant"></div>
              <span class="material-symbols-outlined text-xs text-outline">directions_bus</span>
              <div class="h-[1px] flex-1 bg-outline-variant"></div>
            </div>
            <p class="text-[9px] md:text-[10px] text-slate-400">${item.duration}</p>
          </div>
          <div class="text-right">
            <h3 class="text-lg md:text-xl font-bold brand-font text-primary">${item.arrTime}</h3>
            <p class="text-[10px] md:text-xs text-slate-500 font-medium">${item.to}</p>
          </div>
        </div>
        <div class="w-full md:w-48 pl-0 md:pl-6 border-t md:border-t-0 md:border-l border-surface-container flex flex-col items-center md:items-end justify-center pt-3 md:pt-0">
          <p class="text-xl md:text-2xl font-bold brand-font text-secondary mb-0.5">₹${item.bestPrice.toLocaleString("en-IN")}</p>
          <p class="text-[10px] text-slate-400 mb-1">via ${item.bestPlatform}</p>
          <p class="text-[10px] text-on-tertiary-container font-bold mb-2">${item.seats} seats left</p>
          <button class="w-full py-2 mb-1.5 bg-secondary hover:bg-secondary-container text-white rounded-full font-bold text-sm shadow-lg shadow-secondary/10 transition-all active:scale-95" onclick="openDeal('${item.bestPlatform}', 'buses')">Book Now</button>
          <button class="w-full py-1.5 text-primary border border-primary/30 hover:bg-primary-fixed/10 rounded-full font-semibold text-xs transition-all" onclick="togglePriceCompare(${idx})">Compare ${item.sortedPrices.length} Prices ▾</button>
        </div>
      </div>
      <!-- Amenities & Rating -->
      <div class="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-surface-container-low flex flex-wrap justify-between items-center gap-2">
        <div class="flex flex-wrap gap-2 md:gap-4">
          ${item.amenities.map((a) => `<span class="text-[9px] md:text-[10px] font-bold text-on-surface-variant flex items-center gap-1"><span class="material-symbols-outlined text-xs">check_circle</span>${a}</span>`).join("")}
        </div>
        <div class="flex items-center gap-2">
          <span class="text-[10px] text-on-surface-variant">⭐ ${item.rating}/5</span>
          <span class="text-[10px] text-slate-400">(${item.reviews} reviews)</span>
        </div>
      </div>
      <!-- Hidden price comparison -->
      <div class="hidden mt-4 p-4 bg-surface-container-low rounded-xl" id="price-compare-${idx}">
        <h4 class="text-xs font-bold text-primary mb-3 flex items-center gap-1"><span class="material-symbols-outlined text-sm">compare_arrows</span> Platform Price Comparison — Click to book</h4>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
          ${item.sortedPrices.map(([platform, price], i) => `
            <div class="flex items-center justify-between p-2 rounded-lg ${i === 0 ? 'bg-tertiary-fixed/10 ring-1 ring-on-tertiary-container/20' : 'bg-white hover:bg-surface-container-low'} text-sm cursor-pointer transition-colors" onclick="openDeal('${platform}', 'buses')">
              <span class="${i === 0 ? 'font-bold text-on-tertiary-container' : 'text-on-surface-variant'}">${platform}</span>
              <div class="flex items-center gap-2">
                <span class="font-bold ${i === 0 ? 'text-on-tertiary-container' : 'text-primary'}">₹${price.toLocaleString("en-IN")}${i === 0 ? ' ✓' : ''}</span>
                <span class="material-symbols-outlined text-xs text-outline">open_in_new</span>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    </div>`;
}

// ==================== TOGGLE PRICE COMPARISON ====================
/**
 * Toggle the price comparison view for a specific result card
 * @param {number} idx - Index of the result card
 */
function togglePriceCompare(idx) {
  try {
    const el = document.getElementById(`price-compare-${idx}`);
    if (el) {
      el.classList.toggle("hidden");
      // Smooth scroll to comparison if opening
      if (!el.classList.contains("hidden")) {
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  } catch (e) {
    console.error("Error toggling price comparison:", e);
  }
}

// ==================== INPUT VALIDATION HELPERS ====================
/**
 * Validate phone number format for Indian mobile
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid
 */
function isValidIndianPhone(phone) {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length === 10 && /^[6-9]/.test(cleaned);
}

/**
 * Format phone number for display
 * @param {string} phone - Raw phone number
 * @returns {string} Formatted phone number
 */
function formatPhone(phone) {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length !== 10) return phone;
  return `${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
}

/**
 * Validate search inputs
 * @param {string} from - Origin city
 * @param {string} to - Destination city
 * @returns {object} Validation result with isValid flag and message
 */
function validateSearchInputs(from, to) {
  if (!from || !from.trim()) {
    return { isValid: false, message: "Please enter departure city" };
  }
  if (!to || !to.trim()) {
    return { isValid: false, message: "Please enter destination city" };
  }
  if (from.toLowerCase() === to.toLowerCase()) {
    return { isValid: false, message: "Departure and destination must be different" };
  }
  return { isValid: true, message: "" };
}

// ==================== SUPPORT MODAL ====================
function showSupportModal() {
  const modal = document.getElementById('support-modal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

function closeSupportModal() {
  const modal = document.getElementById('support-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.getElementById('chat-support-panel').classList.add('hidden');
  }
}

function showChatSupport() {
  const chatPanel = document.getElementById('chat-support-panel');
  if (chatPanel) {
    chatPanel.classList.remove('hidden');
    document.getElementById('chat-input').focus();
  }
}

function sendChatMessage() {
  const input = document.getElementById('chat-input');
  const msg = input.value.trim();
  if (!msg) return;
  
  const chatArea = document.querySelector('#chat-support-panel .max-h-48');
  const userMsg = document.createElement('div');
  userMsg.className = 'flex gap-2 mb-2 justify-end';
  userMsg.innerHTML = `<div class="bg-primary text-white rounded-lg px-3 py-2 max-w-xs text-xs"><p>${msg}</p></div>`;
  chatArea.appendChild(userMsg);
  
  input.value = '';
  chatArea.scrollTop = chatArea.scrollHeight;
  
  setTimeout(() => {
    const botMsg = document.createElement('div');
    botMsg.className = 'flex gap-2 mb-2';
    botMsg.innerHTML = `<div class="bg-tertiary-fixed rounded-lg px-3 py-2 max-w-xs"><p class="text-xs font-medium text-tertiary-container">Thanks for reaching out! Our team will respond shortly. For urgent help, call +91 98765 43210.</p></div>`;
    chatArea.appendChild(botMsg);
    chatArea.scrollTop = chatArea.scrollHeight;
  }, 800);
}

// ==================== HOTEL DETAILS MODAL ====================
let currentHotelResults = [];

function showHotelDetails(idx) {
  const hotel = currentHotelResults[idx];
  if (!hotel) return;
  
  const modal = document.getElementById('hotel-details-modal');
  if (!modal) return;
  
  document.getElementById('hotel-detail-name').textContent = hotel.name;
  document.getElementById('hotel-detail-image').src = hotel.image;
  document.getElementById('hotel-detail-location').textContent = hotel.location;
  document.getElementById('hotel-detail-rating').innerHTML = `${hotel.rating}/10 • ${hotel.reviews.toLocaleString()} reviews`;
  
  const starsHtml = '<span class="material-symbols-outlined filled text-secondary text-sm">star</span>'.repeat(hotel.stars);
  document.getElementById('hotel-detail-stars').innerHTML = starsHtml;
  
  const amenitiesHtml = hotel.amenities.map(a => `<span class="px-3 py-1.5 bg-surface-container rounded-full text-sm font-bold text-on-surface-variant">${a}</span>`).join('');
  document.getElementById('hotel-detail-amenities').innerHTML = amenitiesHtml;
  
  document.getElementById('hotel-detail-description').textContent = hotel.description || `Experience luxury and comfort at ${hotel.name}. Centrally located in ${hotel.location}, this hotel offers world-class amenities and exceptional service. Perfect for business travelers and tourists alike.`;
  
  const pricesHtml = hotel.sortedPrices.map(([platform, price]) => `
    <div class="flex items-center justify-between p-3 border border-outline-variant/20 rounded-lg hover:bg-primary-fixed/5 transition-colors cursor-pointer" onclick="openDeal('${platform}', 'hotels')">
      <span class="font-semibold text-on-surface">${platform}</span>
      <div class="flex items-center gap-2">
        <span class="text-lg font-bold text-primary">₹${price.toLocaleString('en-IN')}</span>
        <span class="material-symbols-outlined text-outline">open_in_new</span>
      </div>
    </div>
  `).join('');
  document.getElementById('hotel-detail-prices').innerHTML = pricesHtml;
  
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.style.overflow = 'hidden';
}

function closeHotelDetails() {
  const modal = document.getElementById('hotel-details-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = 'auto';
  }
}

/**
 * Display data source banner (real vs demo data)
 */
function showDataSourceBanner() {
  const bannerContainer = document.getElementById('results-view-header');
  if (!bannerContainer) return;

  const isRealData = typeof window.SKYSCANNER_API_KEY !== 'undefined' && 
                     window.SKYSCANNER_API_KEY !== 'YOUR_SKYSCANNER_API_KEY';
  
  const banner = document.createElement('div');
  banner.className = isRealData ? 
    'bg-tertiary-fixed/20 border-l-4 border-on-tertiary-container' :
    'bg-secondary/10 border-l-4 border-secondary';
  
  const dataText = isRealData ? 'Real-Time Data' : 'Demo Data';
  const dataDescription = isRealData ? 
    'Showing live prices from actual travel APIs' : 
    'Showing simulated data for demo. See REAL_DATA_SETUP.md to enable real data.';
  const emoji = isRealData ? '🔄' : '📊';
  
  banner.innerHTML = `
    <div class="p-3 md:p-4 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <span class="text-lg md:text-xl">${emoji}</span>
        <div>
          <p class="text-sm md:text-base font-bold text-on-surface">${dataText}</p>
          <p class="text-xs md:text-sm text-on-surface-variant">${dataDescription}</p>
        </div>
      </div>
      <button onclick="this.parentElement.parentElement.remove()" class="text-outline hover:text-on-surface-variant transition-colors">
        <span class="material-symbols-outlined">close</span>
      </button>
    </div>
  `;
  
  bannerContainer.insertBefore(banner, bannerContainer.firstChild);
}

// ==================== COUNTERS & SCROLL REVEAL ====================
function animateCounters() {
  document.querySelectorAll(".counter").forEach((counter) => {
    const target = parseFloat(counter.dataset.target);
    const isDecimal = target % 1 !== 0;
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;
      counter.textContent = isDecimal ? current.toFixed(1) : Math.floor(current).toLocaleString("en-IN");
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  });
}

function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

// ==================== SMART RECOMMENDATIONS ====================
function renderSmartRecommendations(type, from, to) {
  const recSection = document.getElementById('smart-recommendations');
  const nearbySection = document.getElementById('nearby-hotels-section');
  const reachSection = document.getElementById('how-to-reach-section');
  
  recSection.style.display = 'block';

  if (type === 'hotels') {
    // For hotels: show "how to reach" only (hotels are already the main results)
    nearbySection.style.display = 'none';
    reachSection.style.display = 'block';
    renderHowToReach(from, to);
  } else {
    // For flights/trains/buses: show BOTH budget hotels + how to reach
    nearbySection.style.display = 'block';
    reachSection.style.display = 'block';
    renderNearbyBudgetHotels(to);
    renderHowToReach(from, to);
  }
}

function renderNearbyBudgetHotels(destination) {
  const grid = document.getElementById('nearby-hotels-grid');
  const budgetHotels = [
    { name: "OYO Townhouse", area: "City Center", price: rand(899, 1800), rating: rand(35, 42) / 10, amenities: ["WiFi", "AC", "TV"] },
    { name: "FabHotel Prime", area: "Railway Station Area", price: rand(1200, 2500), rating: rand(38, 45) / 10, amenities: ["Breakfast", "WiFi", "Parking"] },
    { name: "Treebo Trend", area: "Bus Stand Area", price: rand(1000, 2200), rating: rand(36, 44) / 10, amenities: ["WiFi", "AC", "Room Service"] },
    { name: "Hotel Sarovar", area: "Main Market", price: rand(1500, 3000), rating: rand(40, 46) / 10, amenities: ["Breakfast", "Pool", "WiFi"] },
    { name: "Zostel Hostel", area: "Backpacker Zone", price: rand(399, 899), rating: rand(40, 48) / 10, amenities: ["WiFi", "Common Area", "Kitchen"] },
    { name: "ibis Budget", area: "Near Airport", price: rand(2000, 3500), rating: rand(38, 44) / 10, amenities: ["WiFi", "Breakfast", "AC"] },
  ];
  
  budgetHotels.sort((a, b) => a.price - b.price);
  
  grid.innerHTML = budgetHotels.map((h, i) => {
    const platformKey = h.name.includes('OYO') ? 'OYO' : h.name.includes('FabHotel') ? 'FabHotels' : h.name.includes('Treebo') ? 'Treebo' : h.name.includes('Zostel') ? 'Booking.com' : h.name.includes('ibis') ? 'Booking.com' : 'MakeMyTrip';
    return `
    <div class="bg-surface-container-low rounded-xl p-4 hover:shadow-md transition-all cursor-pointer ${i === 0 ? 'ring-2 ring-on-tertiary-container/20' : ''}" onclick="openDeal('${platformKey}', 'hotels')">
      <div class="flex items-start justify-between mb-2">
        <div>
          <h4 class="text-sm font-bold text-primary">${h.name}</h4>
          <p class="text-[10px] text-on-surface-variant flex items-center gap-1"><span class="material-symbols-outlined text-xs">location_on</span>${h.area}, ${destination}</p>
        </div>
        ${i === 0 ? '<span class="text-[8px] font-bold bg-tertiary-fixed-dim/20 text-on-tertiary-container px-2 py-0.5 rounded-full">CHEAPEST</span>' : ''}
      </div>
      <div class="flex flex-wrap gap-1 mb-3">
        ${h.amenities.map(a => `<span class="text-[8px] bg-surface-container px-2 py-0.5 rounded-full text-on-surface-variant font-medium">${a}</span>`).join('')}
      </div>
      <div class="flex items-end justify-between">
        <div>
          <span class="text-lg font-bold text-secondary brand-font">₹${h.price.toLocaleString('en-IN')}</span>
          <span class="text-[10px] text-on-surface-variant">/night</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="flex items-center gap-1">
            <span class="material-symbols-outlined filled text-secondary text-xs">star</span>
            <span class="text-xs font-bold text-on-surface-variant">${h.rating}</span>
          </div>
          <span class="material-symbols-outlined text-xs text-outline">open_in_new</span>
        </div>
      </div>
    </div>
  `}).join('');
}

function renderHowToReach(from, to) {
  const grid = document.getElementById('how-to-reach-grid');
  
  const options = [
    {
      type: 'Bus',
      icon: 'directions_bus',
      color: 'secondary',
      price: rand(300, 1200),
      duration: `${rand(6, 14)}h`,
      platform: 'RedBus',
      detail: 'AC Sleeper available',
    },
    {
      type: 'Train',
      icon: 'train',
      color: 'primary',
      price: rand(250, 900),
      duration: `${rand(4, 18)}h`,
      platform: 'IRCTC',
      detail: 'Sleeper & AC classes',
    },
    {
      type: 'Flight',
      icon: 'flight',
      color: 'on-tertiary-container',
      price: rand(2500, 8000),
      duration: `${rand(1, 3)}h ${rand(10, 50)}m`,
      platform: 'MakeMyTrip',
      detail: 'Multiple airlines',
    },
    {
      type: 'Cab/Taxi',
      icon: 'local_taxi',
      color: 'secondary',
      price: rand(2000, 6000),
      duration: `${rand(4, 10)}h`,
      platform: 'Ola/Uber',
      detail: 'Door-to-door service',
    },
  ];
  
  options.sort((a, b) => a.price - b.price);
  
  grid.innerHTML = options.map((o, i) => {
    const typeMap = {Bus: 'buses', Train: 'trains', Flight: 'flights', 'Cab/Taxi': 'buses'};
    const searchType = typeMap[o.type] || 'flights';
    return `
    <div class="bg-surface-container-low rounded-xl p-4 hover:shadow-md transition-all text-center cursor-pointer ${i === 0 ? 'ring-2 ring-on-tertiary-container/20' : ''}" onclick="openDeal('${o.platform}', '${searchType}')">
      ${i === 0 ? '<div class="text-[8px] font-bold bg-tertiary-fixed-dim/20 text-on-tertiary-container px-2 py-0.5 rounded-full inline-block mb-2">MOST BUDGET FRIENDLY</div>' : '<div class="mb-2"></div>'}
      <div class="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center mx-auto mb-2">
        <span class="material-symbols-outlined text-${o.color}">${o.icon}</span>
      </div>
      <h4 class="text-sm font-bold text-primary mb-1">${o.type}</h4>
      <p class="text-lg font-bold text-secondary brand-font">₹${o.price.toLocaleString('en-IN')}</p>
      <p class="text-[10px] text-on-surface-variant mb-1">${o.duration} · via ${o.platform}</p>
      <p class="text-[9px] text-outline mb-2">${o.detail}</p>
      <span class="text-[9px] font-bold text-primary flex items-center justify-center gap-0.5">Book <span class="material-symbols-outlined text-[10px]">open_in_new</span></span>
    </div>
  `}).join('');
}
