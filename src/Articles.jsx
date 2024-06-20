import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchAllArticles } from './utils/api';
import './App.css';

const Articles = () => {
  const [sortCriteria, setSortCriteria] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('desc');
  const [articles, setArticles] = useState([]);

  const handleSort = async (criteria) => {
    if (criteria === sortCriteria) {
      setSortOrder(order => (order === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortCriteria(criteria);
      setSortOrder('desc');
    }
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await fetchAllArticles(sortCriteria, sortOrder);
        setArticles(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchArticles();
  }, [sortCriteria, sortOrder]);

  return (
    <div>
      <h2>Articles</h2>
      <div className="sort-controls">
        <ButtonGroup>
          <Button variant="light" onClick={() => handleSort('created_at')}>
            Sort by Date {sortCriteria === 'created_at' && (sortOrder === 'asc' ? '↑' : '↓')}
          </Button>
          <Button variant="light" onClick={() => handleSort('comment_count')}>
            Sort by Comments {sortCriteria === 'comment_count' && (sortOrder === 'asc' ? '↑' : '↓')}
          </Button>
          <Button variant="light" onClick={() => handleSort('votes')}>
            Sort by Votes {sortCriteria === 'votes' && (sortOrder === 'asc' ? '↑' : '↓')}
          </Button>
        </ButtonGroup>
      </div>
      {articles && articles.length > 0 ? (
        <div className="articles-list">
          {articles.map(article => (
            <div key={article.article_id} className="article">
              <h3>
                <Link to={`/articles/${article.article_id}`}>{article.title}</Link>
              </h3>
              {article.imageUrl && (
                <img src={article.imageUrl} alt={article.title} className="article-image" />
              )}
              <p><strong>Topic:</strong> {article.topic}</p>
              <p><strong>Author:</strong> {article.author}</p>
              <p><strong>Created At:</strong> {new Date(article.created_at).toLocaleDateString('en-GB', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</p>
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
