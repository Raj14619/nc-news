import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticlesByTopic } from './utils/api';

const ArticlesByTopic = () => {
  const { topic } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError(null);
      try {
        const articlesData = await fetchArticlesByTopic(topic);
        setArticles(articlesData);
      } catch (error) {
        setError(`Error fetching articles for ${topic}: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [topic]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Articles on {topic}</h2>
      {articles.length > 0 ? (
        <ul>
          {articles.map(article => (
            <li key={article.article_id}>
              <h3>{article.title}</h3>
              <p>Author: {article.author}</p>
              <p>Created At: {article.createdAt}</p>
              <p>Votes: {article.votes}</p>
              <p>Comments: {article.commentCount}</p>
              {article.imageUrl && <img src={article.imageUrl} alt={article.title} />}
            </li>
          ))}
        </ul>
      ) : (
        <div>No articles found for {topic}.</div>
      )}
    </div>
  );
};

export default ArticlesByTopic;
