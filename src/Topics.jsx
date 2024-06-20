// src/Topics.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchTopics } from './utils/api';

const Topics = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchTopicsData = async () => {
      try {
        const topicsData = await fetchTopics();
        setTopics(topicsData);
      } catch (error) {
        console.error('Error fetching topics:', error);
      }
    };

    fetchTopicsData();
  }, []);

  return (
    <div>
      <h2>Topics</h2>
      <ul>
        {topics.map(topic => (
          <li key={topic}>
            <Link to={`/topics/${topic}`}>{topic}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Topics;
