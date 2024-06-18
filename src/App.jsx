import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Articles from './Articles';
import ArticleDetail from './ArticleDetail'; 
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
  return (
    <div className="App">
      <h1>Northcoders News</h1>
      <Routes>
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:article_id" element={<ArticleDetail />} /> {/* Add this route */}
        <Route path="/animals" element={<Animals />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
