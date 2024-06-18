import axios from 'axios';

// Set the base URL for Axios
const api = axios.create({
  baseURL: 'https://be-nc-news-pmo9.onrender.com/api', // Replace with your actual backend API base URL
});

// Function to fetch data based on a parameter
export const fetchAllArticles = async (param) => {
  try {
    const response = await api.get(`/articles`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
