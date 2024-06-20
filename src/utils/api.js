// api.js

import axios from 'axios';

// Set the base URL for Axios
const api = axios.create({
  baseURL: 'https://be-nc-news-pmo9.onrender.com/api', // Replace with your actual backend API base URL
});


export const fetchAllArticles = async (sortCriteria = 'created_at', sortOrder = 'desc') => {
  try {
    const response = await api.get('/articles', {
      params: {
        sort_by: sortCriteria,
        order: sortOrder,
      },
    });
    return response.data.articles.map(article => ({
      ...article,
      imageUrl: article.article_img_url, // Assuming your API returns 'article_img_url' for images
    }));
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

export const updateArticleVotes = async (articleId, incVotes) => {
  try {
    const response = await api.patch(`/articles/${articleId}`, {
      inc_votes: incVotes,
    });
    return response.data.article;
  } catch (error) {
    console.error('Error updating votes:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const postComment = async (articleId, body, username) => {
  try {
    const response = await api.post(`/articles/${articleId}/comments`, {
      username,
      body
    });
    return response.data.comment;
  } catch (error) {
    console.error('Error posting comment:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const deleteComment = async (commentId) => {
  try {
    await api.delete(`/comments/${commentId}`);
  } catch (error) {
    console.error('Error deleting comment:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// New function to fetch topics
export const fetchTopics = async () => {
  try {
    const response = await api.get('/topics');
    return response.data.topics; // Assuming response.data.topics is correct based on your API
  } catch (error) {
    console.error('Error fetching topics:', error);
    throw error;
  }
};

// New function to fetch articles by topic
export const fetchArticlesByTopic = async (topic) => {
  try {
    // Fetch articles based on the provided topic
    const response = await api.get(`articles?topics=${topic}`);
    const articles = response.data.articles;

    // Filter articles by the provided topic
    const filteredArticles = articles.filter(article => article.topic === topic);

    // Format the output as desired
    const formattedArticles = filteredArticles.map(article => ({
      title: article.title,
      author: article.author,
      createdAt: new Date(article.created_at).toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      votes: article.votes,
      commentCount: article.comment_count,
      imageUrl: article.article_img_url
    }));

    return formattedArticles;
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error; // Optional: propagate the error to the caller
  }
}