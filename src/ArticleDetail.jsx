import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticleById, fetchCommentsByArticleId, updateArticleVotes, postComment } from './utils/api';

const ArticleDetail = ({ user }) => {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [postingComment, setPostingComment] = useState(false);
  const [postError, setPostError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const articleData = await fetchArticleById(article_id);
        const commentsData = await fetchCommentsByArticleId(article_id);
        setArticle(articleData);
        setComments(commentsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch article');
        setLoading(false);
      }
    };

    fetchData();
  }, [article_id]);

  const handleVote = async (incVotes) => {
    try {
      setArticle((prevArticle) => ({
        ...prevArticle,
        votes: prevArticle.votes + incVotes,
      }));

      await updateArticleVotes(article_id, incVotes);
    } catch (err) {
      console.error('Failed to update votes:', err.response ? err.response.data : err.message);
      setArticle((prevArticle) => ({
        ...prevArticle,
        votes: prevArticle.votes - incVotes,
      }));
      setError('Failed to update votes');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setPostError(null);
    setPostingComment(true);

    try {
      const postedComment = await postComment(article_id, newComment, user);
      setComments((prevComments) => [postedComment, ...prevComments]);
      setNewComment('');
    } catch (error) {
      setPostError('Failed to post comment');
    } finally {
      setPostingComment(false);
    }
  };

  const handleChange = (event) => {
    setNewComment(event.target.value);
  };

  if (loading) return <p>Loading article...</p>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>{article.title}</h2>
      <img src={article.article_img_url} alt={article.title} className="article-image" />
      <p><strong>Topic:</strong> {article.topic}</p>
      <p><strong>Body:</strong> {article.body}</p>
      <p><strong>Author:</strong> {article.author}</p>
      <p><strong>Created At:</strong> {new Date(article.created_at).toLocaleDateString()}</p>
      <p><strong>Votes:</strong> {article.votes}</p>
      <div>
        <button onClick={() => handleVote(1)}>Like</button>
        <button onClick={() => handleVote(-1)}>Dislike</button>
      </div>
      <p><strong>Comments:</strong> {comments.length}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Comment:
            <textarea
              value={newComment}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <button type="submit" disabled={postingComment}>
          {postingComment ? 'Posting...' : 'Post Comment'}
        </button>
        {postError && <p>{postError}</p>}
      </form>
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
