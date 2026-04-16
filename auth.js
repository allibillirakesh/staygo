// ============================
// StayGo — Firebase Authentication Module
// Google Sign-in + Phone OTP Auth
// ============================

// ==================== HELPER FUNCTIONS ====================
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

// Firebase config — will be replaced after project setup
let firebaseConfig = null;
let auth = null;
let db = null;
let currentUser = null;

// Initialize Firebase (called after config is set)
function initFirebase(config) {
  firebaseConfig = config;
  try {
    // Check if Firebase SDK is loaded
    if (typeof firebase === 'undefined') {
      console.warn("⚠️ Firebase SDK not loaded. Running in demo mode.");
      showAuthFallback();
      return;
    }
    
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    auth = firebase.auth();
    db = firebase.firestore();
    
    // Auth state listener
    auth.onAuthStateChanged((user) => {
      currentUser = user;
      updateAuthUI(user);
      if (user) {
        saveUserProfile(user);
      }
    });
    
    console.log("✅ Firebase initialized successfully");
  } catch (e) {
    console.error("🚨 Firebase init error:", e.message);
    console.warn("Falling back to demo mode...");
    showAuthFallback();
  }
}

// ==================== GOOGLE SIGN-IN ====================
async function signInWithGoogle() {
  if (!auth) { showAuthFallback(); return; }
  try {
    showAuthLoading(true);
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('email');
    provider.addScope('profile');
    const result = await auth.signInWithPopup(provider);
    closeAuthModal();
    showToast(`Welcome, ${result.user.displayName}! 🎉`);
  } catch (error) {
    console.error("Google sign-in error:", error);
    if (error.code === 'auth/popup-closed-by-user') {
      showToast("Sign-in cancelled", "info");
    } else {
      showToast("Sign-in failed. Please try again.", "error");
    }
  } finally {
    showAuthLoading(false);
  }
}

// ==================== PHONE SIGN-IN ====================
let confirmationResult = null;
let recaptchaVerifier = null;

function setupRecaptcha() {
  if (!auth) return;
  if (recaptchaVerifier) {
    recaptchaVerifier.clear();
  }
  recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
    size: 'invisible',
    callback: () => {},
    'expired-callback': () => {
      showToast("reCAPTCHA expired. Please try again.", "info");
    }
  });
}

async function sendOTP() {
  if (!auth) { showAuthFallback(); return; }
  const phoneInput = document.getElementById('phone-input');
  let phoneNumber = phoneInput.value.trim();
  
  if (!phoneNumber) {
    showToast("Please enter your phone number", "error");
    phoneInput.focus();
    return;
  }
  
  // Format the phone number for display
  const displayPhone = formatPhone(phoneNumber);
  
  // Add country code if not present
  if (!phoneNumber.startsWith('+')) {
    phoneNumber = '+91' + phoneNumber.replace(/\D/g, '');
  }
  
  // Validate Indian phone number (10 digits, starting with 6-9)
  if (!/^\+91[6-9]\d{9}$/.test(phoneNumber)) {
    showToast("Please enter a valid 10-digit Indian mobile number (6-9)", "error");
    phoneInput.focus();
    return;
  }
  
  try {
    showAuthLoading(true);
    setupRecaptcha();
    confirmationResult = await auth.signInWithPhoneNumber(phoneNumber, recaptchaVerifier);
    
    // Show OTP input
    document.getElementById('phone-step-1').classList.add('hidden');
    document.getElementById('phone-step-2').classList.remove('hidden');
    document.getElementById('otp-input').focus();
    showToast("OTP sent to " + displayPhone + " ✓");
  } catch (error) {
    console.error("OTP send error:", error);
    if (error.code === 'auth/invalid-phone-number') {
      showToast("Invalid phone number format", "error");
    } else if (error.code === 'auth/too-many-requests') {
      showToast("Too many attempts. Try again later.", "error");
    } else {
      showToast("Failed to send OTP. Try again.", "error");
    }
    // Reset recaptcha
    if (recaptchaVerifier) {
      recaptchaVerifier.clear();
      recaptchaVerifier = null;
    }
  } finally {
    showAuthLoading(false);
  }
}

async function verifyOTP() {
  const otpInput = document.getElementById('otp-input');
  const otp = otpInput.value.trim();
  
  if (!otp || otp.length !== 6) {
    showToast("Please enter the 6-digit OTP", "error");
    return;
  }
  
  if (!confirmationResult) {
    showToast("Session expired. Resend OTP.", "error");
    return;
  }
  
  try {
    showAuthLoading(true);
    const result = await confirmationResult.confirm(otp);
    closeAuthModal();
    showToast(`Welcome! Phone verified ✓`);
  } catch (error) {
    console.error("OTP verify error:", error);
    showToast("Invalid OTP. Please try again.", "error");
  } finally {
    showAuthLoading(false);
  }
}

// ==================== USER PROFILE ====================
async function saveUserProfile(user) {
  if (!db) return;
  try {
    const userRef = db.collection('users').doc(user.uid);
    const doc = await userRef.get();
    
    const userData = {
      uid: user.uid,
      email: user.email || null,
      displayName: user.displayName || 'Traveler',
      photoURL: user.photoURL || null,
      phoneNumber: user.phoneNumber || null,
      lastLogin: firebase.firestore.FieldValue.serverTimestamp(),
    };
    
    if (!doc.exists) {
      userData.createdAt = firebase.firestore.FieldValue.serverTimestamp();
      userData.savedSearches = [];
      userData.favoriteDestinations = [];
    }
    
    await userRef.set(userData, { merge: true });
  } catch (e) {
    console.log("Profile save skipped (Firestore rules):", e.message);
  }
}

// ==================== SIGN OUT ====================
async function signOut() {
  if (auth) {
    await auth.signOut();
  }
  currentUser = null;
  updateAuthUI(null);
  showToast("Signed out successfully");
}

// ==================== AUTH UI ====================
function updateAuthUI(user) {
  const signinBtn = document.getElementById('btn-signin');
  const userMenu = document.getElementById('user-menu');
  const userName = document.getElementById('user-name');
  const userAvatar = document.getElementById('user-avatar');
  
  if (user) {
    signinBtn.classList.add('hidden');
    userMenu.classList.remove('hidden');
    userName.textContent = user.displayName || user.phoneNumber || 'Traveler';
    if (user.photoURL) {
      userAvatar.src = user.photoURL;
      userAvatar.classList.remove('hidden');
    } else {
      userAvatar.classList.add('hidden');
    }
  } else {
    signinBtn.classList.remove('hidden');
    userMenu.classList.add('hidden');
  }
}

function openAuthModal() {
  const modal = document.getElementById('auth-modal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.style.overflow = 'hidden';
  // Reset to initial state
  document.getElementById('auth-tab-google').click();
}

function closeAuthModal() {
  const modal = document.getElementById('auth-modal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  document.body.style.overflow = '';
  // Reset phone steps
  const step1 = document.getElementById('phone-step-1');
  const step2 = document.getElementById('phone-step-2');
  if (step1) step1.classList.remove('hidden');
  if (step2) step2.classList.add('hidden');
}

function switchAuthTab(tab) {
  document.querySelectorAll('.auth-tab-btn').forEach(t => {
    t.classList.remove('bg-primary', 'text-white');
    t.classList.add('text-on-surface-variant');
  });
  document.getElementById(`auth-tab-${tab}`).classList.add('bg-primary', 'text-white');
  document.getElementById(`auth-tab-${tab}`).classList.remove('text-on-surface-variant');
  
  document.getElementById('auth-google-panel').classList.toggle('hidden', tab !== 'google');
  document.getElementById('auth-phone-panel').classList.toggle('hidden', tab !== 'phone');
}

function showAuthLoading(show) {
  const spinner = document.getElementById('auth-loading');
  if (spinner) spinner.classList.toggle('hidden', !show);
}

// Fallback for when Firebase is not configured
function showAuthFallback() {
  showToast("Auth is in demo mode. Set up Firebase for full functionality.", "info");
  // Simulate sign-in for demo
  const demoUser = {
    displayName: "Demo Traveler",
    email: "demo@staygo.in",
    phoneNumber: null,
    photoURL: null,
    uid: "demo-" + Date.now()
  };
  currentUser = demoUser;
  updateAuthUI(demoUser);
  closeAuthModal();
}

// ==================== TOAST NOTIFICATIONS ====================
function showToast(message, type = "success") {
  // Remove existing toasts
  document.querySelectorAll('.toast-notification').forEach(t => t.remove());
  
  const toast = document.createElement('div');
  toast.className = `toast-notification fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] px-6 py-3 rounded-full shadow-2xl text-sm font-semibold flex items-center gap-2 transition-all duration-300 translate-y-4 opacity-0`;
  
  if (type === "success") {
    toast.classList.add('bg-primary', 'text-white');
  } else if (type === "error") {
    toast.classList.add('bg-error', 'text-white');
  } else {
    toast.classList.add('bg-inverse-surface', 'text-inverse-on-surface');
  }
  
  const icon = type === "success" ? "check_circle" : type === "error" ? "error" : "info";
  toast.innerHTML = `<span class="material-symbols-outlined text-sm">${icon}</span> ${message}`;
  document.body.appendChild(toast);
  
  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-4', 'opacity-0');
  });
  
  setTimeout(() => {
    toast.classList.add('translate-y-4', 'opacity-0');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ==================== INIT ON LOAD ====================
// StayGo Firebase Project Config (staygo-567d0)
const STAYGO_FIREBASE_CONFIG = {
  apiKey: "AIzaSyBr6hsfvC9rHLEZps77UgpoSccaZxvIQ6Y",
  authDomain: "staygo-567d0.firebaseapp.com",
  projectId: "staygo-567d0",
  storageBucket: "staygo-567d0.firebasestorage.app",
  messagingSenderId: "825411622826",
  appId: "1:825411622826:web:1a56341e75468f9950fdd3",
  measurementId: "G-XSJCG1NG5H"
};

document.addEventListener('DOMContentLoaded', () => {
  // Set up sign-in button
  const signinBtn = document.getElementById('btn-signin');
  if (signinBtn) {
    signinBtn.addEventListener('click', openAuthModal);
  }
  
  // Initialize Firebase with hardcoded config
  try {
    initFirebase(STAYGO_FIREBASE_CONFIG);
  } catch (e) {
    console.log("Firebase init skipped, using demo mode:", e.message);
  }
});
