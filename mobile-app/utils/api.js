// Simple in-memory storage for offline mode
const localTipPages = {};

// Generate a random token
const generateToken = () => {
  return Math.random().toString(36).substring(2, 15) +
         Math.random().toString(36).substring(2, 15) +
         Math.random().toString(36).substring(2, 15);
};

const API = {
  // Create a new tip page (offline mode - stores in memory)
  createTipPage: async (data) => {
    // Offline mode only - store in memory
    const token = generateToken();
    localTipPages[token] = data;

    return {
      success: true,
      token: token,
      offline: true,
    };
  },

  // Get tip page data by token (offline mode - reads from memory)
  getTipPage: async (token) => {
    // Offline mode - read from memory
    const data = localTipPages[token];
    if (data) {
      return {
        success: true,
        ...data,
        offline: true,
      };
    }
    return {
      success: false,
      error: 'Tip page not found',
    };
  },

  // Get all stored tip pages (for My Links screen)
  getAllTipPages: () => {
    return Object.keys(localTipPages).map(token => ({
      token,
      ...localTipPages[token],
    }));
  },

  // Get full tip page URL
  getTipPageUrl: (token) => {
    // In offline mode, return a shareable text format
    return `Anonymous Tip Token: ${token}\n(This is an offline tip page - data stored locally on this device)`;
  },

  // Configure API base URL (for future use)
  setBaseUrl: (url) => {
    // Not implemented in offline version
  },

  getBaseUrl: () => {
    return 'Offline Mode';
  },
};

export default API;
