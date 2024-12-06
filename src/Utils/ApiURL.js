// Export the API_URL
// const API_URL = "http://localhost:5000/api";
const URL = import.meta.env;
const API_URL = URL.VITE_API_URL;

export default API_URL;
