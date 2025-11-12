import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// Configure your backend URL here
// IMPORTANT: For real devices, you MUST use a real URL (not localhost)
// For production: https://your-domain.com
// For local testing on device: use your computer's local IP (e.g., http://192.168.1.100:3000)
let API_BASE_URL = 'https://your-backend-url.com'; // Default - won't work, forces offline mode

// Generate a random token
const generateToken = () => {
  return Math.random().toString(36).substring(2, 15) +
         Math.random().toString(36).substring(2, 15) +
         Math.random().toString(36).substring(2, 15);
};

const API = {
  // Create a new tip page (offline mode - stores locally)
  createTipPage: async (data) => {
    try {
      // Try backend first if URL is configured
      if (API_BASE_URL && !API_BASE_URL.includes('your-backend-url')) {
        const response = await axios.post(`${API_BASE_URL}/api/create-tip-page`, data, {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 5000,
        });
        return response.data;
      }
    } catch (error) {
      console.log('Backend unavailable, using offline mode');
    }

    // Offline mode - store locally
    const token = generateToken();
    await SecureStore.setItemAsync(`tip_data_${token}`, JSON.stringify(data));
    return {
      success: true,
      token: token,
      offline: true,
    };
  },

  // Get tip page data by token (offline mode - reads from local storage)
  getTipPage: async (token) => {
    try {
      // Try backend first if URL is configured
      if (API_BASE_URL && !API_BASE_URL.includes('your-backend-url')) {
        const response = await axios.get(`${API_BASE_URL}/api/tip/${token}`, {
          timeout: 5000,
        });
        return response.data;
      }
    } catch (error) {
      console.log('Backend unavailable, using offline mode');
    }

    // Offline mode - read from local storage
    const data = await SecureStore.getItemAsync(`tip_data_${token}`);
    if (data) {
      return {
        success: true,
        ...JSON.parse(data),
        offline: true,
      };
    }
    return {
      success: false,
      error: 'Tip page not found',
    };
  },

  // Get full tip page URL
  getTipPageUrl: (token) => {
    if (API_BASE_URL && !API_BASE_URL.includes('your-backend-url')) {
      return `${API_BASE_URL}/tip/${token}`;
    }
    // In offline mode, return a shareable text format
    return `Anonymous Tip Token: ${token}\n(Configure backend URL in app settings to get web links)`;
  },

  // Configure API base URL (for settings)
  setBaseUrl: (url) => {
    API_BASE_URL = url;
  },

  getBaseUrl: () => {
    return API_BASE_URL;
  },
};

export default API;
