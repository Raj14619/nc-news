import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticleById } from './utils/api'; 

const ArticleDetail = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const getArticle = async () => {
      try {
        const data = await fetchArticleById(article_id);
        setArticle(data.article); 
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };
    
    getArticle();
  }, [article_id]);

  if (!article) return <p>Loading...</p>;

  return (
    <div>
      <h2>{article.title}</h2>
      <img src={article.article_img_url} alt={article.title} className="article-image" />
      <p><strong>Topic:</strong> {article.topic}</p>
      <p><strong>Author:</strong> {article.author}</p>
      <p><strong>Created At:</strong> {new Date(article.created_at).toLocaleDateString()}</p>
      <p><strong>Votes:</strong> {article.votes}</p>
      <p><strong>Comments:</strong> {article.comment_count}</p>
      <p>{article.body}</p> 
    </div>
  );
};

export default ArticleDetail;
