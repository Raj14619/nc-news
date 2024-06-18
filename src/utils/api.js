import axios from 'axios';

// Set the base URL for Axios
const api = axios.create({
  baseURL: 'https://be-nc-news-pmo9.onrender.com/api', // Replace with your actual backend API base URL
});

export const fetchAllArticles = async (param) => {
  try {
    const response = await api.get(`/articles`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};


export const fetchArticleById = async (id) => {
    const response = await api.get(`/articles/${id}`);
    return response.data;
    //const data = await response.json();
    return data;
  };