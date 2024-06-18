import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticleById, fetchCommentsByArticleId } from './utils/api'; 

const ArticleDetail = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const articleData = await fetchArticleById(article_id);
        const commentsData = await fetchCommentsByArticleId(article_id);
        setArticle(articleData);
        setComments(commentsData);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error state or display error message
      }
    };
    
    fetchData();
  }, [article_id]);

  if (!article) return <p>Loading article...</p>;

  return (
    <div>
      <h2>{article.title}</h2>
      <img src={article.article_img_url} alt={article.title} className="article-image" />
      <p><strong>Topic:</strong> {article.topic}</p>
      <p><strong>Body:</strong> {article.body}</p>

      <p><strong>Author:</strong> {article.author}</p>
      <p><strong>Created At:</strong> {new Date(article.created_at).toLocaleDateString()}</p>
      <p><strong>Votes:</strong> {article.votes}</p>
      <p><strong>Comments:</strong> {comments.length}</p>
      <p>{article.body}</p>
      {/* Rendering comments here */}
      {comments.map(comment => (
        <div key={comment.comment_id}>
          <p>{comment.body}</p>
          <p>By: {comment.author}</p>
          <p>Created At: {new Date(comment.created_at).toLocaleDateString()}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default ArticleDetail;
