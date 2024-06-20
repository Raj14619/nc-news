import React, { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Articles from './Articles';
import ArticleDetail from './ArticleDetail';
import Login from './Login';
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
        <Route path="/animals" element={<Animals />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
