import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchAllArticles } from './utils/api'; // Make sure this function is correctly implemented and imported
import './App.css';

const Articles = () => {
  const [selectedOption, setSelectedOption] = useState('all');
  const [articles, setArticles] = useState([]);

  const fetchArticles = async () => {
    try {
      const data = await fetchAllArticles(); // Ensure this returns a correct response
      setArticles(data); // Assuming data is an array of articles
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSelect = (eventKey) => {
    setSelectedOption(eventKey);
    fetchArticles();
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div>
      <h2>Articles</h2>
      <div className="dropdown-container">
        <label htmlFor="dropdown-basic" className="dropdown-label">Select an option:</label>
        <Dropdown onSelect={handleSelect}>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {selectedOption || 'Dropdown Button'}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item eventKey="all">All Articles</Dropdown.Item>
            <Dropdown.Item eventKey="action-1">Action 1</Dropdown.Item>
            <Dropdown.Item eventKey="action-2">Another action</Dropdown.Item>
            <Dropdown.Item eventKey="action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      {articles && articles.length > 0 ? (
        <div className="articles-list">
          {articles.map(article => (
            <div key={article.article_id} className="article">
              <h3>
                <Link to={`/articles/${article.article_id}`}>{article.title}</Link>
              </h3>
              <img src={article.article_img_url} alt={article.title} className="article-image" />
              <p><strong>Topic:</strong> {article.topic}</p>
              <p><strong>Author:</strong> {article.author}</p>
              <p><strong>Created At:</strong> {new Date(article.created_at).toLocaleDateString()}</p>
              <p><strong>Votes:</strong> {article.votes}</p>
              <p><strong>Comments:</strong> {article.comment_count}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No articles found.</p>
      )}
    </div>
  );
};

export default Articles;
