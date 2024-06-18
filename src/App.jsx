import React, { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchAllArticles } from '../src/utils/api';

const Articles = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [articles, setArticles] = useState([]);

  const handleSelect = async (eventKey) => {
    setSelectedOption(eventKey);
    try {
      const data = await fetchAllArticles();
      setArticles(data.articles); // Adjust according to the API response structure
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    // Fetch data initially when the component mounts
    handleSelect();
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
      {articles && articles.length > 0 && (
        <div className="articles-list">
          {articles.map(article => (
            <div key={article.article_id} className="article">
              <h3>{article.title}</h3>
              <img src={article.article_img_url} alt={article.title} className="article-image" />
              <p><strong>Topic:</strong> {article.topic}</p>
              <p><strong>Author:</strong> {article.author}</p>
              <p><strong>Created At:</strong> {new Date(article.created_at).toLocaleDateString()}</p>
              <p><strong>Votes:</strong> {article.votes}</p>
              <p><strong>Comments:</strong> {article.comment_count}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

const Animals = () => (
  <div>
    <h2>Animals</h2>
  </div>
);

function App() {
  return (
    <div className="App">
      <h1>Northcoders News</h1>
      <Routes>
        <Route path="/articles" element={<Articles />} />
        <Route path="/animals" element={<Animals />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;