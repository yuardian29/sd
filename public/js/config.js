// js/config.js - Configuration for Local & Production
// Automatically detects environment and sets API endpoint

// Detect environment
function getEnvironment() {
  const hostname = window.location.hostname;
  
  // Production domains
  if (hostname.includes('netlify.app') || hostname.includes('your-domain.com')) {
    return 'production';
  }
  
  // Development
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'development';
  }
  
  // Default
  return 'production';
}

// Configuration by environment
const config = {
  development: {
    apiUrl: 'http://localhost:3000',
    dbName: 'sd-mudel',
    useLocalStorage: true,
    debug: true
  },
  
  production: {
    apiUrl: process.env.REACT_APP_API_URL || 'https://school-management-api.herokuapp.com',
    dbName: 'sd-mudel',
    useLocalStorage: false,
    debug: false
  }
};

const environment = getEnvironment();
const APP_CONFIG = config[environment];

// Export configuration
if (typeof module !== 'undefined' && module.exports) {
  module.exports = APP_CONFIG;
}

console.log(`🔧 Environment: ${environment}`);
console.log(`🌐 API URL: ${APP_CONFIG.apiUrl}`);
console.log(`💾 Using LocalStorage: ${APP_CONFIG.useLocalStorage}`);
