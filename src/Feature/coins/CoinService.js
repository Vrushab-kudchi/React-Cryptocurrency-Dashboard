import axios from "axios";

// Create Axios instance with base URL and headers
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  header: {
    "x-cg-pro-api-key": import.meta.env.VITE_API_KEY,
  },
});

// Function to fetch coins
const getCoins = async () => {
  try {
    const response = await axiosInstance.get("/coins/markets?vs_currency=inr");

    return response.data;
  } catch (error) {
    console.error("Error fetching coins:", error);
    throw error;
  }
};

const coinService = {
  getCoins,
};

export default coinService;
