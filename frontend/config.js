const IDENTITY_URL = import.meta.env.VITE_IDENTITY_URL || 'https://id.softnetkenya.com';
const ACCOUNT_API_URL = import.meta.env.VITE_ACCOUNT_API_URL || 'https://account.softnetkenya.com';
const fallbackURL = import.meta.env.VITE_API_FALLBACK || 'https://backend-softnet.onrender.com';

let baseURL;

if (import.meta.env.MODE === 'production') {
  baseURL = ACCOUNT_API_URL || fallbackURL;
} else {
  baseURL = 'http://192.168.0.103:5005';
}

export const identityUrl = IDENTITY_URL;
export const accountApiUrl = ACCOUNT_API_URL;
export default baseURL;
