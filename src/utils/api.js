import axios from 'axios';

// Set the base URL for Axios
const api = axios.create({
  baseURL: 'https://be-nc-news-pmo9.onrender.com/api', // Replace with your actual backend API base URL
});

export const fetchAllArticles = async () => {
  try {
    const response = await api.get('/articles');
    return response.data.articles; // Assuming response.data.articles is correct based on your API
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
};

export const fetchArticleById = async (id) => {
  try {
    const response = await api.get(`/articles/${id}`);
    return response.data.article; // Assuming response.data.article is correct based on your API
  } catch (error) {
    console.error('Error fetching article:', error);
    throw error;
  }
};

export const fetchCommentsByArticleId = async (id) => {
  try {
    const response = await api.get(`/articles/${id}/comments`);
    return response.data; // Assuming response.data.comments is correct based on your API
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};
