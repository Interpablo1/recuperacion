import axios from "axios";

const API_BASE_URL = "https://restcountries.com/v3.1";

export const fetchAllCountries = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/all`);
    return response.data;
  } catch (error) {
    console.error("Error fetching countries:", error);
    throw error;
  }
};

export const fetchCountryById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/alpha/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching country ${id}:`, error);
    throw error;
  }
};
