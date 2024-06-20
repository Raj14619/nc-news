import React, { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Articles from './Articles';
import ArticlesByTopic from './ArticlesByTopic';
import Login from './Login';
import Topics from './Topics';
import 'bootstrap/dist/css/bootstrap.min.css';

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

const NotFound = () => (
  <div>
    <h2>404 - Page Not Found</h2>
    <p>The page you are looking for does not exist.</p>
    <a href="/">Return to Homepage</a>
  </div>
);

const ArticleNotFound = () => (
  <div>
    <h2>Article Not Found</h2>
    <p>The article you are looking for does not exist.</p>
    <a href="/articles">Return to Articles</a>
  </div>
);

const TopicNotFound = () => (
  <div>
    <h2>Topic Not Found</h2>
    <p>The topic you are looking for does not exist.</p>
    <a href="/topics">Return to Topics</a>
  </div>
);

const ArticleDetail = ({ user }) => {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [comment, setComment] = useState({ username: '', email: '', text: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`/api/articles/${article_id}`)
      .then(response => setArticle(response.data))
      .catch(error => {
        if (error.response && error.response.status === 404) {
          setArticle(null);
        }
      });
  }, [article_id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.username || !comment.email || !comment.text) {
      setError('Please provide all required information.');
      return;
    }
    axios.post('/api/comments', comment)
      .then(response => {
        // Handle successful comment submission
      })
      .catch(error => {
        if (error.response && error.response.status === 400) {
          setError(error.response.data.message);
        }
      });
  };

  if (article === null) {
    return <ArticleNotFound />;
  }

  return (
    <div>
      <h2>{article.title}</h2>
      <p>{article.body}</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={comment.username}
          onChange={(e) => setComment({ ...comment, username: e.target.value })}
          placeholder="Username"
          required
        />
        <input
          type="email"
          value={comment.email}
          onChange={(e) => setComment({ ...comment, email: e.target.value })}
          placeholder="Email"
          required
        />
        <textarea
          value={comment.text}
          onChange={(e) => setComment({ ...comment, text: e.target.value })}
          placeholder="Comment"
          required
        />
        <button type="submit">Post Comment</button>
      </form>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

const ArticlesByTopicWrapper = () => {
  const { topic } = useParams();
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`/api/topics/${topic}/articles`)
      .then(response => setArticles(response.data))
      .catch(error => {
        if (error.response && error.response.status === 404) {
          setError('Topic not found');
        }
      });
  }, [topic]);

  if (error) {
    return <TopicNotFound />;
  }

  return <ArticlesByTopic articles={articles} />;
};

function App() {
  const [user, setUser] = useState(localStorage.getItem('user'));

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', user);
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  return (
    <div className="App">
      <h1>Northcoders News</h1>
      <Routes>
        <Route path="/" element={<Navigate to={user ? "/articles" : "/login"} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/articles" element={user ? <Articles /> : <Navigate to="/login" />} />
        <Route path="/articles/:article_id" element={user ? <ArticleDetail user={user} /> : <Navigate to="/login" />} />
        <Route path="/topics" element={<Topics />} />
        <Route path="/topics/:topic" element={<ArticlesByTopicWrapper />} />
        <Route path="/animals" element={<Animals />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
